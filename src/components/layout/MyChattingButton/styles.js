import { css } from "@emotion/react";

export const btn = css`
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background-color: #d9d9d9;
  text-align: center;
  line-height: 60px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const closeChattingBtn = css`
  position: relative;
  width: 100%;
  height: 100%;
  > p {
    font-size: 12pz;
    margin: 0;
    color: #a4a4a4;
  }

  > svg {
    position: absolute;
    color: #4990fcff;
    font-size: 20px;
    top: -4px;
    right: -4px;
  }
`;

export const openChattingBtn = css`
  width: 100%;
  height: 100%;

  > svg {
    color: #fff;
    font-size: 25px;
    transform: translateY(7px);
  }
`;
