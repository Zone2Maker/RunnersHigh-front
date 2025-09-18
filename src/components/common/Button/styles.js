import { css } from "@emotion/react";

export const button = css`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #5a5a5a;
  color: #efefef;
  font-size: 18px;
  box-sizing: border-box;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
