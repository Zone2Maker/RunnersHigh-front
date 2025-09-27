import { css } from "@emotion/react";

export const mainFeedContainer = css`
  width: 100%; /* 화면 전체 차지 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: flex-start; /* 위에서부터 시작 */
  background-color: #f8f9fa;
`;

export const container = css`
  margin-top: 80px;
  width: 100%;
  max-width: 480px; /* 인스타 피드 폭 고정 (가운데 정렬용) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const feedContainer = css`
  width: 100%;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  border: 1px solid #e6e6e6ff;
`;

export const empty = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  opacity: 0.8;
  font-size: 20px;
  padding: 30px;
  & > svg {
    font-size: 60px;
  }
`;

export const mapBox = css`
  display: block;
  width: 100%;
  height: 550px;
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
