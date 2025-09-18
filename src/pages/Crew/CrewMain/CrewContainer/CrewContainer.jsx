/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { useInfiniteQuery } from "@tanstack/react-query";
import CrewCard from "../CrewCard/CrewCard";
import { getCrewListReq } from "../../../../services/crew/crewApis";

function CrewContainer() {
  //refetch 문제 고민(중복된 값 crewList..)
  const size = 12;
  const [search, setSearch] = useState(null);
  const [region, setRegion] = useState(null);
  const [crewList, setCrewList] = useState([]);
  const observerTarget = useRef(null);
  /**
   * data => crewList
   * boolean hasNextPage
   * fetchNextPage => 다음 페이지 요청
   * **pageParam == nextCursorCrewId
   */
  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["fetchList", size, search, region], //파라미터 명시 필요
      queryFn: ({ pageParam = null, queryKey }) => {
        const [, size, search, region] = queryKey; //배열
        return getCrewListReq(pageParam, size, search, region);
      },
      getNextPageParam: (lastPage) =>
        lastPage?.data?.data?.nextCursorCrewId ?? undefined,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      //==data?.pages[마지막 페이지 index]?.data?.data?.nextCursorCrewId
    });

  useEffect(() => {
    if (isLoading) return;

    if (
      isError ||
      data?.pages[data.pages.length - 1]?.data?.status === "failed"
    ) {
      //모달
      //홈화면으로 전환
      return;
    }
    console.log(data);
    const slicedCrewList =
      data?.pages[data.pages.length - 1]?.data?.data?.crewList.slice(0, -1) ??
      [];
    setCrewList((prev) => [...prev, ...slicedCrewList]);
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (!observerTarget.current) return; //DOM 아직 없으면?

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isLoading && hasNextPage && entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.01 } //10%만 보여도 감지
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

  return (
    <div css={s.container}>
      {crewList ? (
        crewList.map((crew) => (
          <CrewCard key={crew.crewId} crew={crew} isLoading={isLoading} />
        ))
      ) : (
        <></>
      )}
      <div ref={observerTarget} style={{ height: "60px" }} />
    </div>
  );
}

export default CrewContainer;
