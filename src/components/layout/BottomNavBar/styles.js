import { css } from "@emotion/react";

// 공통 - 하단 내비게이션 바
export const navContainer = css`
  /* 화면 하단에 고정 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;

  width: 500px;
  margin: 0 auto;

  height: 60px;
  background-color: #f8f8f8;
  opacity: 0.85;
  border: none;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const navItem = css`
  width: calc(100% / 4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px; /* 아이콘과 텍스트 사이 간격 */
  transform: translateY(2px);

  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2 ease;

  &:hover {
    color: #0d47a1;
    font-weight: 800;
  }
`;

// 활성화된 탭에만 추가될 스타일
export const activeNavItem = css`
  color: #0d47a1; /* 활성화 상태 색상 */
  font-weight: 800;
`;

export const profileBox = css`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
`;

export const profileImg = css`
  width: 28px;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
