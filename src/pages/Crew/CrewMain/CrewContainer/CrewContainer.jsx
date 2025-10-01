/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { useInfiniteQuery } from "@tanstack/react-query";
import CrewCard from "../CrewCard/CrewCard";
import { getCrewListReq } from "../../../../services/crew/crewApis";
import AlertModal from "../../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function CrewContainer({ search, region }) {
  const SIZE = 12;
  const [crewList, setCrewList] = useState([]);
  const observerTarget = useRef(null);

  const { data, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["crewList", SIZE, search, region],
      queryFn: ({ pageParam = null }) => {
        return getCrewListReq(pageParam, SIZE, search, region);
      },
      getNextPageParam: (lastPage) =>
        lastPage?.data?.data?.nextCursorCrewId ?? undefined,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (isLoading || isError) return;

    const crewList =
      data?.pages.flatMap((page) => page?.data?.data?.crewList) ?? [];
    setCrewList(crewList);
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

  return (
    <>
      <div css={s.container}>
        {isError ? (
          <AlertModal>
            <BiSolidMessageSquareError
              size={"60px"}
              style={{ color: "#f57c00" }}
            />
            <strong>크루 목록을 불러올 수 없습니다.</strong>
            <p>다시 시도해주세요.</p>
          </AlertModal>
        ) : crewList && crewList.length > 0 ? (
          crewList.map((crew) =>
            crew.crewStatus === "ACTIVE" ? (
              <CrewCard key={crew.crewId} crew={crew} isLoading={isLoading} />
            ) : null
          )
        ) : (
          <div css={s.empty}>
            <h2>아직 등록된 크루가 없습니다.</h2>
            <p>새로운 크루를 만들어보세요!</p>
          </div>
        )}
      </div>
      <div ref={observerTarget} style={{ height: "80px" }} />
    </>
  );
}

export default CrewContainer;
