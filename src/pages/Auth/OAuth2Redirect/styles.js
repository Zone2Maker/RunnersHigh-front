import { css } from "@emotion/react";

export const pageContainer = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden; /* 스크롤 제거 */
`;

export const mainContainer = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

export const messageStyle = css`
  color: #555;
  font-weight: 600;
`;
