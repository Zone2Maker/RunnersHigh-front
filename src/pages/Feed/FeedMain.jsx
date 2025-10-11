/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedListReq } from "../../services/feed/feedApis";
import { AiOutlinePicture } from "react-icons/ai";
import FeedContainer from "../../components/common/FeedContainer/FeedContainer";
import FeedBtnContainer from "./FeedBtnContainer/FeedBtnContainer";
import FeedMapView from "./FeedMapView/FeedMapView";
import { queryClient } from "../../configs/queryClient";

function FeedMain() {
  const size = 12;
  const [feedList, setFeedList] = useState([]);
  const observerTarget = useRef(null);
  const [view, setView] = useState(0);

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feeds", size],
    queryFn: ({ pageParam = null, queryKey }) => {
      const [, size] = queryKey;
      return getFeedListReq(undefined, pageParam, size);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.data?.data?.nextCursorFeedId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isLoading || isError) return;
    const feeds = data?.pages.flatMap((page) => page.data.data.feeds) ?? [];
    setFeedList(feeds);
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (!observerTarget.current || view !== 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isLoading && hasNextPage && entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isLoading, view]);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds"],
        exact: false,
      });
    };
  }, []);

  return (
    <>
      <FeedBtnContainer view={view} setView={setView} />

      <div css={s.mainFeedContainer}>
        <div css={s.container}>
          {view === 0 && (
            <>
              {feedList.length > 0 ? (
                <div css={s.feedContainer}>
                  <FeedContainer feeds={feedList} isLoading={isLoading} />
                </div>
              ) : (
                !isLoading && (
                  <div css={s.empty}>
                    <AiOutlinePicture />
                    <div>게시물 없음</div>
                  </div>
                )
              )}

              {isError && (
                <AlertModal
                  alertModal={{
                    isOpen: false,
                    message: "피드 목록을 불러올 수 없습니다.",
                    subMessage: "",
                    status: "fail",
                  }}
                  onClose={() => window.location.reload()}
                />
              )}

              <div ref={observerTarget} style={{ height: "40px" }}>
                {(isLoading || isFetchingNextPage) && (
                  <p style={{ textAlign: "center", margin: 10 }}>로딩 중...</p>
                )}
              </div>
            </>
          )}

          {view === 1 && (
            <div css={s.mapBox}>
              <FeedMapView />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedMain;
