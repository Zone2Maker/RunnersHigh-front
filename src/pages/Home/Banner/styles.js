import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 230px;
  background-color: #fefefe;
  position: relative;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.09), 0px 1px 3px rgba(0, 0, 0, 0.07);

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

  font-size: 28px;
  font-weight: 700;
`;
