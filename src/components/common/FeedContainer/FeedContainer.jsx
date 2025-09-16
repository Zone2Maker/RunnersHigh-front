/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";

function FeedContainer({ feeds }) {
  if (!feeds || feeds.length === 0) {
    return (
      <div css={s.emptyContainer}>
        <p>게시물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div css={s.container}>
      {feeds.map((feed) => (
        <div css={s.feed} key={feed.id}>
          <img src={feed.imageUrl} alt={`${feed.id}번 피드 이미지`} />
          <div css={s.like}>
            <p>
              <FaHeart />
            </p>
            <p>{feed.likeCount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedContainer;
