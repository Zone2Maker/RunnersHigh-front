import { css } from "@emotion/react";

// export const mainFeedContainer = css`
// width: 95%;
// display: flex;
// justify-content: center;
// align-items: center;
// `

// export const container = css`
//   width: 100%;
//   /* height: calc(100vh - 120px); */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   position: relative;
// `;
export const mainFeedContainer = css`
  width: 100%;              /* 화면 전체 차지 */
  display: flex;
  justify-content: center;  /* 가운데 정렬 */
  align-items: flex-start;  /* 위에서부터 시작 */
  
`;

export const container = css`
  margin-top: 80px;
  width: 100%;
  max-width: 470px;         /* 인스타 피드 폭 고정 (가운데 정렬용) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

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
  `