/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedListReq } from "../../services/feed/feedApis";
import { AiOutlinePicture } from "react-icons/ai";
import FeedContainer from "../../components/common/FeedContainer/FeedContainer";
import FeedBtnContainer from "./FeedBtnContainer/FeedBtnContainer";
import MarkerClusteringFeed from "./MarkerClusteringFeed/MarkerClusteringFeed";

function FeedMain() {
  const size = 12;
  const [feedList, setFeedList] = useState([]);
  const observerTarget = useRef(null);
  const [view, setView] = useState(0); // 0 = 사진, 1 = 지도

  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feeds", size],
      queryFn: ({ pageParam = null, queryKey }) => {
        const [, size] = queryKey;
        return getFeedListReq(undefined, pageParam, size);
      },
      getNextPageParam: (lastPage) =>
        lastPage?.data?.data?.nextCursorFeedId ?? undefined,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (isLoading || isError) return;
    const feeds = data?.pages.flatMap((page) => page.data.data.feeds) ?? [];
    setFeedList(feeds);
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (!observerTarget.current || view !== 0) return; // 사진 모드일 때만 작동
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

  return (
    <>
      {/* 상단 버튼 */}
      <FeedBtnContainer setView={setView} />

      <div css={s.mainFeedContainer}>
        <div css={s.container}>
          {/* 사진 모드 */}
          {view === 0 && (
            <>
              {isError && (
                <AlertModal onClose={() => window.location.reload()}>
                  <BiSolidMessageSquareError
                    size="60px"
                    style={{ color: "#ff4d4d" }}
                  />
                  <strong>피드 목록을 불러올 수 없습니다.</strong>
                  <p>다시 시도해주세요.</p>
                </AlertModal>
              )}

              {!isError && feedList.length > 0 && (
                <FeedContainer feeds={feedList} isLoading={isLoading} />
              )}

              {!isError && feedList.length === 0 && !isLoading && (
                <div css={s.empty}>
                  <AiOutlinePicture />
                  <div>게시물 없음</div>
                </div>
              )}

              {/* 무한스크롤 트리거 */}
              <div ref={observerTarget} style={{ height: "40px" }} />

              {(isLoading || isFetchingNextPage) && (
                <p style={{ textAlign: "center", margin: 10 }}>로딩 중...</p>
              )}
            </>
          )}

          {/* 지도 모드 */}
          {view === 1 && (
            <div>
              <MarkerClusteringFeed/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedMain;
