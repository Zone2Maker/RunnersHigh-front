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
`;

export const titleContainer = css`
  margin: 0;
  padding: 0;
  margin-bottom: 37px;

  & > p {
    margin-top: 10px;
    margin-bottom: 20px;
    color: #b6b6b6;
  }
`;

export const title = css`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 46px;
  font-weight: 600;
  color: #6e6e6e;
  margin-top: 20px;
`;
