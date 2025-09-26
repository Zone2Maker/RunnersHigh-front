import { css } from "@emotion/react";

export const container = css`
  height: 180px;
  padding: 10px 30px;
  margin: 0 10px;
  border-radius: 35px;
  background-color: #fefefe;
  box-sizing: border-box;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.09),
    /* Y축(3px), 흐림(5px)으로 중간값 설정 */ 0px 1px 3px rgba(0, 0, 0, 0.07); /* 디테일 그림자는 은은하게 유지 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const dateContainer = css`
  display: flex;
  align-items: baseline; /* 텍스트 베이스라인 정렬 */
  gap: 8px;
  padding: 0 10px;

  & > span:nth-of-type(1) {
    font-size: 18px;
    font-weight: 600;
  }
  & > span:nth-of-type(2) {
    font-size: 22px;
    font-weight: 700;
    color: #00296b;
  }
  & > span:nth-of-type(3) {
    font-size: 15px;
    font-weight: 600;
  }
`;

export const weatherContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const weatherIcon = css`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3ff;
  border-radius: 35px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08),
    /* 아래로 은은하게 퍼지는 그림자 */ 0px 1px 2px rgba(0, 0, 0, 0.05); /* 더 가깝게, 살짝 더 연한 그림자 */

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
    color: #535455ff;
    font-weight: 700;
  }
`;

export const weatherTop = css`
  gap: 12px;

  & > div:nth-of-type(1) {
    & > span:nth-of-type(1) {
      font-size: 33px;
      font-weight: 600;
      color: #00296b;
    }

    & > span:nth-of-type(2) {
      font-size: 19px;
      font-weight: 600;
    }
  }

  & > div {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
  }
`;

export const comment = css`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #ffa500;
`;
