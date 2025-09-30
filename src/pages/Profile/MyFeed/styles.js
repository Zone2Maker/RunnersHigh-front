import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const feed = css`
  aspect-ratio: 1;
  background-color: #f7f9fa;

  & > img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

export const feedContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const empty = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #888;
  opacity: 0.8;
  font-size: 20px;

  & > svg {
    font-size: 60px;
  }
`;
