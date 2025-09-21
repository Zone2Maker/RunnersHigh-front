/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { getThisWeekStartAndEnd } from "../../../utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyTopCrewsReq } from "../../../services/crew/crewApis";
import { CiMedal } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function WeeklyTopCrew() {
  const navigate = useNavigate();
  const { start, end } = getThisWeekStartAndEnd(new Date());
  const {
    isLoading,
    isError,
    data: response,
  } = useQuery({
    queryKey: ["topFeeds", start, end],
    queryFn: () => getWeeklyTopCrewsReq(start, end),
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isError) {
    window.location.reload();
  }

  const actualCrews = response?.data?.data || [];

  const placeholders = new Array(5 - actualCrews.length).fill(null);

  const crews = [...actualCrews, ...placeholders];

  return (
    <div css={s.container}>
      <div css={s.titleContainer}>
        <div css={s.title}>
          <CiMedal />
          <div>
            <div>
              이번주 인기 크루
              <br />
              <span>TOP 5</span>
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/crew")}>더보기+</div>
      </div>
      <ul css={s.crewList}>
        {isLoading
          ? // 로딩중
            new Array(5)
              .fill(null)
              .map((_, index) => (
                <li key={`null-${index}`} css={s.crewItem(index)}></li>
              ))
          : // 로딩 완료
            crews.map((crew, index) =>
              crew ? (
                <li key={crew.crewId} css={s.crewItem(index)}>
                  <p css={s.rank(index)}>
                    {index === 0 || index === 1 || index === 2 ? (
                      <CiMedal />
                    ) : (
                      index + 1
                    )}
                  </p>
                  <p css={s.name}>{crew.crewName}</p>
                  <p css={s.like}>
                    <FaHeart />
                    <span>{crew.totalLikes}</span>
                  </p>
                </li>
              ) : (
                <li key={`null-${index + 1}`} css={s.crewItem(index)}></li>
              )
            )}
      </ul>
    </div>
  );
}

export default WeeklyTopCrew;
