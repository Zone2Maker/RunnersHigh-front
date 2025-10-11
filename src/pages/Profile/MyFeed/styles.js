import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
`;

export const feedContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const observer = css`
  height: 60px;

  & > p {
    text-align: center;
    margin: 10px;
  }
`;
