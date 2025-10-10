import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  box-sizing: border-box;
`;

export const title = css`
  margin: 0;
  text-align: center;
  font-size: 46px;
  font-weight: 600;
`;

export const subTitle = css`
  margin: 10px 0 24px 0;
  color: #888;
  font-size: 14px;
`;
