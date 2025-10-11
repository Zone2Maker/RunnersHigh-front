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
  height: 30%;
  max-height: 700px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > strong {
    font-size: 17px;
  }

  > p {
    margin: 0;
    font-size: 14px;
  }
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
  font-size: 20px;
  transform: translateY(2px);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
