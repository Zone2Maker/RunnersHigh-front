import { css } from "@emotion/react";

export const container = css`
  height: 180px;
  padding: 10px 40px;
  margin: 0 20px;
  border-radius: 35px;
  border: 1px solid #e6e6e6ff;
  background-color: #f5f5f5;
  box-sizing: border-box;
  color: #333;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const dateContainer = css`
  display: flex;
  align-items: baseline; /* 텍스트 베이스라인 정렬 */
  gap: 10px;
  padding: 0 10px;

  & > span:nth-of-type(1) {
    font-size: 16px;
    font-weight: 400;
  }
  & > span:nth-of-type(2) {
    font-size: 24px;
    font-weight: 500;
  }
  & > span:nth-of-type(3) {
    font-size: 14px;
  }
`;

export const weatherContainer = css`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

export const weatherIcon = css`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3ff;
  border-radius: 35px;

  & > img {
    width: 100%;
    aspect-ratio: 1;
  }
`;

export const weatherDetails = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > div {
    display: flex;
  }
`;

export const weatherTop = css`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  & > div:nth-of-type(1) {
    & > span:nth-of-type(1) {
      font-size: 32px;
      font-weight: 400;
    }

    & > span:nth-of-type(2) {
      font-size: 18px;
      font-weight: 500;
    }
  }

  & > div {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
  }
`;

export const comment = css`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;
