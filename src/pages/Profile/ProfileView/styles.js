import { css } from "@emotion/react";

export const profileImg = css`
  width: 115px;
  height: 115px;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  border-radius: 50%;
  overflow: hidden;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const userInfo = css`
  flex-grow: 1;
  min-width: 0; // 자식 요소의 ellipse위한 속성
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
`;

export const nameEmailGroup = css`
  margin-bottom: 10px;
`;

export const username = css`
  font-size: 26px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    :hover {
      color: #0b3678ff;
    }
  }
`;

export const email = css`
  font-size: 14px;
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    color: #aaa;
  }
`;

export const infoGroup = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;

  div {
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  svg {
    color: #666;
  }
`;

export const info = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const label = css`
  display: flex;
  align-items: center;
  width: 86px;
  flex-shrink: 0;
`;

export const value = css`
  flex-grow: 1;
  min-width: 0; // 내용이 길어져도 너비가 늘어나는 것을 방지
  font-weight: 600;
  overflow: hidden; // 영역을 벗어나는 내용 숨기기
  white-space: nowrap; /* 줄바꿈 없이 한 줄로 표시 */
  text-overflow: ellipsis; /* 벗어나는 텍스트를 ...으로 표시 */
  display: flex;

  & > p {
    margin: 0;
    padding: 0;
    font-weight: 400;
  }
`;
