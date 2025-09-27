import { css } from "@emotion/react";

export const container = css`
  width: 500px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #f8f9fa;
  box-shadow: 0px 0px 7px 3px rgba(207, 207, 207, 0.5);
  display: flex;
  flex-direction: column;
`;

export const mainContainer = css`
  flex-grow: 1;
  overflow-y: auto;
`;
