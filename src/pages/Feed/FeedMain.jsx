/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeedListReq, getFeedDetailReq } from "../../services/feed/feedApis";
import { AiOutlinePicture } from "react-icons/ai";
import FeedContainer from "../../components/common/FeedContainer/FeedContainer";
import FeedBtnContainer from "./FeedBtnContainer/FeedBtnContainer";
import FeedMapView from "./FeedMapView/FeedMapView";
import FeedDetailModal from "./FeedDetailModal/FeedDetailModal";
import { queryClient } from "../../configs/queryClient";

function FeedMain() {
  const size = 12;
  const [feedList, setFeedList] = useState([]);
  const observerTarget = useRef(null);
  const [view, setView] = useState(0);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedDetail, setFeedDetail] = useState(null);
  const [newLike, setNewLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [imageErrors, setImageErrors] = useState(new Set());

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
      <FeedBtnContainer setView={setView} />

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
                <AlertModal onClose={() => window.location.reload()}>
                  <BiSolidMessageSquareError
                    size="60px"
                    style={{ color: "#ff4d4d" }}
                  />
                  <strong>피드 목록을 불러올 수 없습니다.</strong>
                  <p>다시 시도해주세요.</p>
                </AlertModal>
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
              <FeedMapView
                onOpenModal={async (feedId) => {
                  try {
                    const res = await getFeedDetailReq(feedId);
                    if (res.data.status === "success") {
                      const data = res.data.data;
                      setFeedDetail(data);
                      setNewLike(data.isLikedByUser);
                      setLikeCount(data.likeCount);
                      setIsModalOpen(true);
                    }
                  } catch (error) {
                    console.error("피드 상세 조회 실패:", error);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <FeedDetailModal
        isOpen={isModalOpen}
        feedDetail={feedDetail}
        newLike={newLike}
        likeCount={likeCount}
        imageErrors={imageErrors}
        onClose={() => setIsModalOpen(false)}
        onHeartClick={() => {
          if (newLike) {
            setLikeCount((prev) => prev - 1);
          } else {
            setLikeCount((prev) => prev + 1);
          }
          setNewLike(!newLike);
        }}
      />
    </>
  );
}

export default FeedMain;
