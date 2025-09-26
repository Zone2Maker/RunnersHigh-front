/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FiCamera } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getLastWeek, getLastWeekStartAndEnd } from "../../../utils/dateUtils";
import { getWeeklyTopFeedReq } from "../../../services/feed/feedApis";
import { useQuery } from "@tanstack/react-query";

function WeeklyTopFeed() {
  const navigate = useNavigate();
  const { start, end } = getLastWeekStartAndEnd(new Date());
  const {
    isLoading,
    isError,
    data: response,
  } = useQuery({
    queryKey: ["topFeeds", start, end],
    queryFn: () => getWeeklyTopFeedReq(start, end),
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isError) {
    window.location.reload();
  }

  const actualFeeds = response?.data?.data || [];

  const placeholders = new Array(8 - actualFeeds.length).fill(null);

  const feeds = [...actualFeeds, ...placeholders];

  return (
    <div css={s.container}>
      <div css={s.titleContainer}>
        <div css={s.titleGroup}>
          <FiCamera css={s.icon} />
          <div>
            <div css={s.subtitle}>{getLastWeek(new Date())}</div>
            <div css={s.title}>
              인기 피드 <FaFireAlt />
            </div>
          </div>
        </div>
        <div css={s.moreBtn} onClick={() => navigate("/feed")}>
          더보기+
        </div>
      </div>
      <div css={s.feedContainer}>
        {isLoading
          ? // 로딩중
            new Array(8)
              .fill(null)
              .map((_, index) => <div key={index} css={s.feed}></div>)
          : // 로딩 완료
            feeds.map((feed, index) =>
              feed ? (
                <div key={feed.feedId} css={s.feed}>
                  <img src={feed.feedImgUrl} />
                </div>
              ) : (
                <div key={index} css={s.feed}></div>
              )
            )}
      </div>
      <div css={s.footer}></div>
    </div>
  );
}

export default WeeklyTopFeed;
