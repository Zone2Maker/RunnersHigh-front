import { css } from "@emotion/react";

// 전체 페이지 레이아웃
export const container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  background-color: #fefefe;
`;

// 닫기 버튼 (X)
export const closeButton = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ------------------- 상세 조회 모드 ------------------- */
export const detailContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const detailDate = css`
  font-size: 16px;
  font-weight: bold;
  color: #444;
`;

export const detailContent = css`
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap; /* 줄바꿈 반영 */
  padding: 12px;
  border-radius: 8px;
  background-color: #fafafa;
`;

/* ------------------- 작성 모드 ------------------- */
export const writeContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const textArea = css`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.6;
  outline: none;

  &:focus {
    border-color: #4cafef;
    box-shadow: 0 0 0 2px rgba(76, 175, 239, 0.2);
  }
`;

export const saveButton = css`
  align-self: flex-end;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background-color: #4cafef;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #3a9cdc;
  }
`;
