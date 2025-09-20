import { css } from "@emotion/react";

export const oAuth2MergeForm = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;

  & > button {
    cursor: pointer;
  }
`;

export const inputGroup = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 입력창 간격 */
`;

export const readOnlyInput = css`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #555555;
  font-size: 16px;
  user-select: none; /* 드래그 금지 */
  pointer-events: none; /* 클릭 금지 */
`;

export const passwordInput = css`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 16px;
`;

export const successMessage = css`
  font-size: 18px;
  font-weight: 600;
  color: #13b343ff;
  text-align: center;
`;
