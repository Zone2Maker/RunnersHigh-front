import { css } from "@emotion/react";

export const mainContainer = css`
  flex-grow: 1;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;         
`;

export const title = css`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  margin-top: 150px;
  margin-bottom: 60px;
`;

export const linksContainer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 0.8rem;

  a {
    color: #888;
    text-decoration: none;
  }

  span {
    color: #ccc;
  }
`;

export const socialSection = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

export const socialButton = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #eee;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const google = css`
background-color: #F2F2F2;
`

export const kakao = css`
  background-color: #FEE500;
`;

export const naver = css`
  background-color: #03C75A;
`;