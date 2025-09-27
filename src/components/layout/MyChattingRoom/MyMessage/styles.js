import { css } from "@emotion/react";

export const messageContainer = css`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 5px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 5px;
  }
`;

export const messageBox = css`
  background-color: #d3d3d3;
  border-radius: 8px 0 8px 8px;
  padding: 5px 10px;
  max-width: 250px;
  box-sizing: border-box;

  > p {
    margin: 0;
    word-break: keep-all;
    word-wrap: break-word;
    font-size: 15px;
    line-height: 20px;
  }
`;

export const timeBox = css`
  height: 100%;
  display: flex;
  justify-content: end;

  > p {
    margin: 0;
    font-size: 10px;
  }
`;
