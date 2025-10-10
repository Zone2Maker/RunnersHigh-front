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
  font-size: 46px;
  font-weight: 600;
  color: #333;
`;

export const subTitle = css`
  margin: 10px 0 24px 0;
  color: #888;
  font-size: 14px;
`;

export const btnContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const comment = css`
  font-size: 20px;
`;

export const subComment = css`
  font-size: 13px;
`;
