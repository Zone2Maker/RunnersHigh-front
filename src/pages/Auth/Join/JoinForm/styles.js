import { css } from "@emotion/react";

export const joinForm = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > button {
    cursor: pointer;
  }
`;

export const inputGroup = css`
  width: 100%;
`;

export const messageBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2px;
  margin-bottom: 10px;
`;

export const error = css`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #f81717ff;
`;

export const check = css`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #13b343ff;
`;

export const alertContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & > span {
    font-weight: 600;
    font-size: 18px;
  }
`;
