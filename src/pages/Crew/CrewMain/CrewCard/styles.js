import { css } from "@emotion/react";

export const card = (isFull) => css`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  border-radius: 23px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pointer-events: ${isFull && "none"};
  cursor: ${isFull ? "not-allowed" : "pointer"};
  opacity: ${isFull && "0.5"};
`;

export const imgBox = css`
  width: 100%;
  height: 140px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const noImgBox = css`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  opacity: 0.8;
  font-size: 12px;
  border-bottom: 1px solid #e3e3e3;

  > svg {
    fill: #777;
    font-size: 48px;
  }
`;

export const contentBox = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  padding: 10px 15px;
  box-sizing: border-box;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const regionAndMemberBox = css`
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const region = css`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  gap: 2px;

  & svg {
    font-size: 13px;
    color: #00296b;
    transform: translateY(1px);
  }
`;

export const seperator = css`
  width: 1.5px;
  height: 12px;
  background-color: #888;
`;

export const member = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 12px;

  & svg {
    font-size: 15px;
  }
`;

export const crewName = css`
  height: 21px;
  font-size: 18px;
  font-weight: 700;
`;

export const crewDetail = css`
  height: 34px;
  margin: 0;
  color: #444;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  // 2줄 넘어가면 ...처리
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
