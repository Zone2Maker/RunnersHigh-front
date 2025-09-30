import { css } from "@emotion/react";

export const button = css`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  color: #efefef;
  font-size: 18px;
  letter-spacing: 0.7px;
  font-weight: 600;
  box-sizing: border-box;

  cursor: pointer;
  background-color: #06409eff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0c4dadff;
  }
`;
