import { css } from "@emotion/react";

// --- 로그인 페이지 ---
export const pageContainer = css`
  width: 600px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const header = css`
  background-color: #0d47a1;
  color: white;
  padding: 16px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const formContainer = css`
  padding: 40px 20px;
  text-align: center;
  flex-grow: 1;
`;

export const title = css`
  font-size: 2rem;
  margin-bottom: 30px;
`;

export const loginButton = css`
  width: 100%;
  padding: 16px;
  margin-top: 10px;
  border: none;
  background-color: #555;
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const linksContainer = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 0.9rem;

  a {
    color: #888;
    text-decoration: none;
  }
`;

// --- 소셜 로그인 ---
export const socialSection = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
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
  font-size: 1.5rem;
  font-weight: bold;
`;

export const google = css`
  /* 구글 로고 이미지로 대체하거나 텍스트 사용 */
`;
export const kakao = css`
  background-color: #FEE500;
`;
export const naver = css`
  background-color: #03C75A;
  color: white;
`;

// --- 하단 네비게이션 바 ---
export const navContainer = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 420px;
  margin: 0 auto;
  height: 70px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const navItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #555;
  font-size: 0.7rem;
  cursor: pointer;

  &:hover {
    color: #004AAD;
  }
`;

// --- 채팅 플로팅 버튼 ---
export const fab = css`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e9e9e9;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 0.9rem;
`;

export const notificationDot = css`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid #e9e9e9;
`;