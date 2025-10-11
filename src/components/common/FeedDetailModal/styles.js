import { css } from "@emotion/react";

// 모달
export const userInfoContainer = css`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 15px 15px 15px;
  margin-top: 16px;
  margin-bottom: 8px;
  gap: 10px;

  align-items: center;
`;

export const profileContainer = css`
  width: 50px;
  height: 50px;
  background-color: #bdbdbd;
  border-radius: 50%;
  border: 1px solid #ddd;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;
export const userInfoBox = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

export const username = css`
  font-size: 18px;
  font-weight: 700;
`;

export const userLocation = css`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 2px;

  & > svg {
    font-size: 15px;
    color: #04327c;
    stroke-width: 1.5px;
    transform: translateY(1px);
  }
`;

export const photoContainer = css`
  width: 100%;
`;

export const feedPhotoDetail = css`
  width: 100%;
  background-color: #fefefe;
`;

export const modalLikeInfo = css`
  display: flex;
  align-items: center;
  padding: 0 15px;
  transform: translateY(-8px);
`;

export const modalHeartIcon = (newLike) => css`
  fill: ${newLike ? "#FB4141" : "#333"};
  font-size: 22px;
  transition: all 0.1s ease;
  cursor: pointer;
  transform: translateY(2px);

  &:hover {
    fill: ${newLike ? "#333" : "#FB4141"};
  }
`;

export const modalLikeCount = css`
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 18px;
  font-weight: 500;

  & > p {
    margin-right: 3px;
    padding: 0;
    font-size: 20px;
    font-weight: 600;
  }

  & > span {
    color: #444;
  }
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
