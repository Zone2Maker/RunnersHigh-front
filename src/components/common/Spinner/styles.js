import { css, keyframes } from "@emotion/react";

// 회전 애니메이션 정의
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const spinner = css`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: #0d47a1; /* 로고 색상과 유사하게 설정 */

  animation: ${spin} 1.2s ease infinite;
`;
