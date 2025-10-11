/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { getILikedFeedListReq } from "../../../services/feed/feedApis";
import FeedContainer from "../../../components/common/FeedContainer/FeedContainer";
import { queryClient } from "../../../configs/queryClient";

function LikedFeed() {
  const SIZE = 12;
  const [feedList, setFeedList] = useState([]);
  const observerTarget = useRef(null);
  const { principal } = usePrincipalState();

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feeds", "liked", principal?.userId, SIZE],
    queryFn: ({ pageParam = null, queryKey }) => {
      const [, , , SIZE] = queryKey;
      return getILikedFeedListReq(pageParam, SIZE);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.data?.data?.nextCursorFeedId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isLoading || isError) return;

    const feedList = data?.pages.flatMap((page) => page.data.data.feeds) ?? [];
    setFeedList(feedList);
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isLoading && hasNextPage && entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

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
      <div css={s.feedContainer}>
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
      </div>
      <div ref={observerTarget} css={s.observer}>
        {(isLoading || isFetchingNextPage) && <p>로딩 중...</p>}
      </div>
    </div>
  );
}

export default LikedFeed;
