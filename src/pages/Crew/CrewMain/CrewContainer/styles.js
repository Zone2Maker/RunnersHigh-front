import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  padding: 0px 10px;
  background-color: #f7f9fa;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const empty = css`
  position: fixed;

  p {
    margin-left: 10px;
  }

  > h2 {
    margin: 0px 0px 10px 10px;
  }
`;
