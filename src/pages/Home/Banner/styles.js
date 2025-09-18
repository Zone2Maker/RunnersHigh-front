import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 230px;
  background-color: antiquewhite;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const comment = css`
  position: absolute;
  bottom: 12px;
  left: 12px;

  font-size: 24px;
  font-weight: 600;
  color: #333;
`;
