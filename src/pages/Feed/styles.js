import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f8f9fa;
`;

export const feedContainer = css`
  width: 100%;
  margin-top: 83px;
  flex-grow: 1;
`;

export const observer = css`
  height: 60px;

  & > p {
    text-align: center;
    margin: 10px;
  }
`;
