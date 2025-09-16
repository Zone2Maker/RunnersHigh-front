import { css } from "@emotion/react";

export const input = css`
  width: 100%;
  padding: 18px 16px;
  outline: none;
  border: none;

  font-size: 1rem;
  color: #333;

  background-color: #f9f9f9;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;

  &:last-of-type {
    border-bottom: none;
  }

  &::placeholder {
    color: #999;
  }
`;
