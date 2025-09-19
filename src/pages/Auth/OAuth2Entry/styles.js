import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  box-sizing: border-box;
  gap: 15px;
`;

export const titleContainer = css`
  width: 100%;
  text-align: center;
`;

export const title = css`
  margin: 0;
  padding: 0;
  font-size: 46px;
  font-weight: 600;
  color: #333;
`;

export const subTitle = css`
  color: #888;
  font-size: 14px;
`;

export const btnContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > button {
    cursor: pointer;
  }
`;

export const comment = css`
  font-size: 20px;
`;

export const subComment = css`
  font-size: 13px;
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
