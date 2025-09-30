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
  background-color: #f8f9fa;
`;

export const title = css`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 46px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const joinButton = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 500;

  a {
    color: #444;
    text-decoration: none;

    transition: all 0.2s;

    &:hover {
      color: #f57c00;
      font-weight: 600;
    }
  }
`;

export const socialSection = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 46px;
  margin-top: 15px;
`;

export const socialButton = css`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  border: 1px solid #eee;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: white;

  & > svg {
    font-size: 30px;
  }
`;

export const google = css`
  background-color: #f2f2f2;
`;

export const kakao = css`
  background-color: #fee500;
`;

export const naver = css`
  background-color: #03c75a;

  & > svg {
    font-size: 22px;
  }
`;
