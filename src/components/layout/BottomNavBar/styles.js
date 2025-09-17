import { css } from "@emotion/react";

// 공통 - 하단 내비게이션 바
export const navContainer = css`
  /* 화면 하단에 고정 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;

  /* 모바일 화면 너비*/
  width: 500px;
  margin: 0 auto;

  height: 60px;
  background-color: #f8f8f8;
  opacity: 0.85;
  border: none;

  /* 아이콘 4개 배치*/
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const navItem = css`
  width: calc(100% / 4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* 아이콘과 텍스트 사이 간격 */

  color: #555;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2 ease;

  /* 마우스를 올렸을 때 색상 변경 */
  &:hover {
    /* background-color: #888; */
    color: #0d47a1; /* 헤더 파란색 동일 */
  }
`;

// 활성화된 탭에만 추가될 스타일
export const activeNavItem = css`
  color: #0d47a1; /* 활성화 상태 색상 */
  font-weight: bold;
`;
