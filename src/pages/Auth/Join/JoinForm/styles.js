import { css } from "@emotion/react";

export const joinForm = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  * {
    box-sizing: border-box;
  }

  &,
  & * {
    overflow: visible !important;
  }

  & > div input {
    border: 1px solid #e8e8e8 !important;
    border-radius: 0 !important;
    background-color: #fefefe;
    padding: 18px 16px;
    outline: none;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    position: relative;
    z-index: 0;
  }

  & > div input:first-of-type {
    border-radius: 10px 10px 0 0 !important;
  }

  & > div input:last-of-type {
    border-radius: 0 0 10px 10px !important;
  }

  & > div input:focus {
    border-color: #0d47a1 !important; /* 두께는 그대로 1px */
    box-shadow: 0 0 0 1px #0d47a1; /* 파란 외곽선으로 강조 */
    z-index: 1;
  }

  & > Button {
    cursor: pointer;
    background-color: #0d47a1;
    transition: all 0.2s ease;

    &:hover {
      background-color: #04327c;
    }

    &:disabled {
      background-color: #91a8cdff;
      color: #f1f1f1;
      cursor: not-allowed;
    }
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
