import { css } from "@emotion/react";

// 모달 전체를 덮는 반투명 배경
export const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 실제 모달 컨텐츠 영역
export const modalContent = css`
  position: relative;
  width: 90%;
  max-width: 420px;
  /* height: 70%; */
  height: auto;
  max-height: 85vh;
  background-color: #fefefe;
  border-radius: 24px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 자식 요소가 border-radius를 넘지 않도록 */
`;

// 나가기 버튼
export const leaveButton = css`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
`;

// 닫기 버튼 (X)
export const closeButton = css`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #e0e0e0;
  color: #555;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
