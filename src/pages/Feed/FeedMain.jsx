/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedListReq } from "../../services/feed/feedApis";
import FeedContainer from "../../components/common/FeedContainer/FeedContainer";
import FeedBtnContainer from "./FeedBtnContainer/FeedBtnContainer";
import FeedMapView from "./FeedMapView/FeedMapView";
import { queryClient } from "../../configs/queryClient";

function FeedMain() {
  const SIZE = 12;
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
    queryKey: ["feeds", SIZE],
    queryFn: ({ pageParam = null, queryKey }) => {
      const [, SIZE] = queryKey;
      return getFeedListReq(undefined, pageParam, SIZE);
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
    <div css={s.container}>
      <FeedBtnContainer view={view} setView={setView} />
      <div css={s.feedContainer}>
        {view === 0 ? (
          <>
            <FeedContainer feeds={feedList} isLoading={isLoading} />
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
            <div ref={observerTarget} css={s.observer}>
              {(isLoading || isFetchingNextPage) && <p>로딩 중...</p>}
            </div>
          </>
        ) : (
          <FeedMapView />
        )}
      </div>
    </div>
  );
}

export default FeedMain;
