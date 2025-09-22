import { css } from "@emotion/react";

// 상단 버튼 nav 바 개선 해야할 점
// 게시물 없을 시 위로 밀려 올라가는 문제 있음

export const btnNav = css`
  position: fixed;
  top: 60px; /* ❗️ LOGO가 있는 헤더의 높이를 여기에 입력하세요. 예: 60px */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background-color: #fefefe;
  z-index: 1; /* z-index 값을 높여 다른 요소에 가려지지 않게 합니다. */

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
`;

export const changeBtnContainer = css`
  display: flex;
  justify-content: space-between; /* 왼쪽 div, 오른쪽 div를 끝으로 배치 */
  align-items: center;

  width: 100%;
  max-width: 470px;
  padding: 10px 15px;
  border-radius: 23px;
  background-color: #e7e7e7ff;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
`;

// export const showPhoto = css`
//   border: none;
//   cursor: pointer;
// `;
// export const showMap = css`
//   border: none;
//   cursor: pointer;
// `;
// export const addBtn = css`
//   border: none;
//   cursor: pointer;
// `;

export const showPhoto = css`
  margin: 0;
  background-color: #d6d6d6ff;
  border-radius: 15px;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  font-size: 22px;
  margin-left: 5px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;
  &:hover {
    background-color: #bfbfbf;
  }
`;

export const showMap = css`
  margin: 0;
  background-color: #d6d6d6ff;
  border-radius: 15px;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  font-size: 22px;
  margin-left: 5px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;
  &:hover {
    background-color: #bfbfbf; /* hover 시 배경 살짝 진하게 */
  }
`;

export const addBtn = css`
  margin: 0;
  background-color: #d6d6d6ff;
  border-radius: 15px;
  padding: 4px 12px;
  border: none;
  cursor: pointer;
  font-size: 22px;
  margin-right: 3px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;
  &:hover {
    background-color: #bfbfbf; /* hover 시 배경 살짝 진하게 */
  }
`;
