import { css } from "@emotion/react";

export const container = css`
  position: sticky;
  top: 0;
  flex-shrink: 0;

  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: #00296b;
  z-index: 10;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.04);

  & > span {
    padding: 0;
    margin: 0;
    text-align: left;
    line-height: 60px;
    font-size: 30px;
    font-weight: 800;
    color: #efefef;
    cursor: pointer;
  }
`;
