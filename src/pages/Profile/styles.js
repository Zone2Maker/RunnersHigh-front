import { css } from "@emotion/react";

export const container = css`
  width: calc(100% - 40px);
  min-height: calc(100vh - 120px);
  margin: 0 20px;
  padding-top: 25px;
  /* padding-bottom: 75px; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const profileMain = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
