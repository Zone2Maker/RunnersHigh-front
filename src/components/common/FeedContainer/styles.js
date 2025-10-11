import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  align-content: flex-start;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  gap: 2px;
  background-color: #f8f9fa;
`;

export const feedItem = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
`;

export const feedImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const feedNoImageBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  opacity: 0.8;
  font-size: 10px;

  & > svg {
    fill: #777;
    font-size: 40px;
  }
`;

export const likeInfo = css`
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 3px 7px;
  display: flex;
  align-items: center;
  gap: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
`;

export const heartIcon = (liked) => css`
  fill: ${liked ? "#FB4141" : "#222"};
  font-size: 16px;
  margin-right: 4px;
`;

export const likeCount = css`
  margin: 0;
`;

export const empty = css`
  position: fixed;

  p {
    margin-left: 10px;
  }

  > h2 {
    margin: 10px 0px 10px 10px;
  }
`;
