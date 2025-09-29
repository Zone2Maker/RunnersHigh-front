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
  }
`;

export const messageBox = css`
  background-color: #0141a8;
  border-radius: 10px 0 10px 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  max-width: 250px;
  box-sizing: border-box;
  color: #f2f2f2;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 20px;
`;

export const timeBox = css`
  height: 100%;
  display: flex;
  justify-content: end;

  > p {
    margin: 0;
    font-size: 10px;
    color: #555;
  }
`;
