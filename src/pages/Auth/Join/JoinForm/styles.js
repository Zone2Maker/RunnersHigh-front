import { css } from "@emotion/react";

export const joinForm = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const messageBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const message = (color) => css`
  margin: 0;
  font-size: 13px;
  color: ${color};
`
