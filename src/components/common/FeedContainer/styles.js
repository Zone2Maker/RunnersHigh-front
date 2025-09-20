import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 300px;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  gap: 3px;
`;

export const feedItem = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
`;

// 피드 사진 스타일
export const feedImage = css`
  /* feedItem 내부 꽉 채움 */
  width: 100%;
  height: 100%;
  /* 이미지 비율 유지하며 잘리는 부분생겨도 꽉 채움 - 인스타 스타일 */
  object-fit: cover;
  display: block;
`;

export const feedNoImageBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  opacity: 0.8;
  font-size: 10px;

  & > svg {
    fill: #777;
    font-size: 40px;
  }
`;

// 하트 아이콘 + 좋아요 수
export const likeInfo = css`
  position: absolute;
  bottom: 4px;
  left: 4px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
`;

export const heartIcon = (liked) => css`
  fill: ${liked ? "#FB4141" : "black"};
  margin-right: 4px;
`;

export const likeCount = css`
  font-weight: 300;
  margin: 0;
`;

// 모달
export const userInfoContainer = css`
  width: 100%;
  height: 4.5em;
  display: flex;
  padding: 15px 15px 15px;
  margin-top: 20px;

  align-items: center;
`;

export const profileContainer = css`
  background-color: #bdbdbd;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;

  & > img {
    width: 100%;
  }
`;

export const username = css`
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: 0.1em;
`;
export const userLocation = css`
  font-size: 15px;
`;

export const photoContainer = css`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 420px;
  height: 86%;
`;

export const feedPhotoDetail = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const modalLikeInfo = css`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin: 0px 17px 18px;
  height: 2.5em;
`;

export const modalHeartIcon = (newLike) => css`
  /* margin-right: 4px; */
  cursor: pointer;
  fill: ${newLike ? "#FB4141" : "#333"};
  font-size: 20px;
  transition: all 0.1s ease;

  &:hover {
    fill: ${newLike ? "#333" : "#FB4141"};
  }
`;

export const modalLikeCount = css`
  margin-left: 5px;
  font-size: 18px;
`;

export const feedDetailNoImageBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  opacity: 0.8;
  font-size: 14px;

  & > svg {
    fill: #777;
    font-size: 80px;
  }
`;
