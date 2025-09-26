import { css } from "@emotion/react";

export const container = css`
  margin: 0 10px;
  background-color: #fefefe;
  border-radius: 35px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.09), 0px 1px 3px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

// 전체 헤더 컨테이너
export const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px 15px 5px 20px;
  background-color: #fefefe;
`;

export const titleGroup = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const icon = css`
  font-size: 55px;
  stroke-width: 1.8px;
  color: #0d47a1;
`;

// 부제 (예: 9월 3주차)
export const subtitle = css`
  font-size: 18px;
  font-weight: 600;
  margin-left: 2px;
`;

// 메인 제목 (인기 피드)
export const title = css`
  font-size: 30px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  & > svg {
    color: #ff4500;
  }
`;

export const moreBtn = css`
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: #f57c00;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

export const feedContainer = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
`;

export const feed = css`
  aspect-ratio: 1;
  background-color: #f0f0f0;

  & > img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

export const footer = css`
  width: 100%;
  height: 30px;
`;
