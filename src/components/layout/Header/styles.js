import { css } from "@emotion/react";

export const container = css`
  position: sticky;
  top: 0;
  flex-shrink: 0;

  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: #fefefe;
  z-index: 10;

  box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.2);

  & > span {
    padding: 0;
    margin: 0;
    text-align: left;
    line-height: 60px;
    font-size: 28px;
    font-weight: 800;
    color: #0d47a1;
    cursor: pointer;
  }
`;
