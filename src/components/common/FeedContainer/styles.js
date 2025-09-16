import { css } from "@emotion/react";

// 부모 div에 높이를 확실히 정해줘야 함
export const emptyContainer = css`
  width: 100%;
  flex-grow: 1;
  color: #333;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const container = css`
  width: 100%;
  min-height: 300px;
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  gap: 3px;
`;

export const feed = css`
  width: 100%;
  aspect-ratio: 1;
  background-color: #f0f0f0;
  box-sizing: border-box;
  display: flex;
  position: relative;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const like = css`
  position: absolute;
  bottom: 6px;
  left: 6px;
  color: white;
  gap: 4px;
  display: flex;
  justify-content: center;
  font-weight: 500;

  & > p {
    padding: 0;
    margin: 0;
  }
`;
