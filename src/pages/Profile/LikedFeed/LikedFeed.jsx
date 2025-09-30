/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { getILikedFeedListReq } from "../../../services/feed/feedApis";
import { AiOutlinePicture } from "react-icons/ai";
import FeedContainer from "../../../components/common/FeedContainer/FeedContainer";
import { queryClient } from "../../../configs/queryClient";

function LikedFeed() {
  const size = 12;
  const [feedList, setFeedList] = useState([]);
  const observerTarget = useRef(null);
  const { principal } = usePrincipalState();

  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["feeds", "liked", principal?.userId, size],
      queryFn: ({ pageParam = null, queryKey }) => {
        const [, , , size] = queryKey;
        return getILikedFeedListReq(pageParam, size);
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
    <>
      <div css={s.container}>
        {isError ? (
          <AlertModal onClose={() => window.location.reload()}>
            <BiSolidMessageSquareError
              size={"60px"}
              style={{ color: "#f57c00" }}
            />
            <strong>피드 목록을 불러올 수 없습니다.</strong>
            <p>다시 시도해주세요.</p>
          </AlertModal>
        ) : feedList && feedList.length > 0 ? (
          <div css={s.feedContainer}>
            <FeedContainer feeds={feedList} isLoading={isLoading} />
          </div>
        ) : (
          <div css={s.empty}>
            <AiOutlinePicture />
            <div>게시물 없음</div>
          </div>
        )}
      </div>
      <div ref={observerTarget} style={{ height: "80px" }}></div>
      {isLoading && (
        <p style={{ textAlign: "center", margin: 10 }}>로딩 중...</p>
      )}
    </>
  );
}

export default LikedFeed;
