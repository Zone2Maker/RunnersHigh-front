import { css } from "@emotion/react";

// 채팅방 전체 컨테이너
export const chatContainer = (isChatOpen) => css`
  position: fixed;
  right: 50px;
  bottom: 110px;
  width: 330px;
  height: 550px;
  border-radius: 20px;
  background-color: #d7d7d7;
  transition: all 0.4s ease;
  overflow: hidden;
  box-shadow: 0 6px 30px rgba(63, 63, 63, 0.12);
  display: ${isChatOpen ? "flex" : "none"};
  flex-direction: column;
  opacity: ${isChatOpen ? 1 : 0};
  /* transform: ${!isChatOpen ? "translateX(40px)" : "translateX(0px)"}; */
  z-index: 100;
`;

export const leaveConfirm = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  padding: 30px 40px 20px;
  background-color: #fefefe;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  & > p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`;

export const btnContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const confirmBtn = css`
  padding: 6px 15px;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export const cancelBtn = css`
  font-weight: 500;
  background-color: #f0f0f0;
  transition: all 0.1s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const leaveBtn = css`
  font-weight: 600;
  color: #fcfcfc;
  background-color: #ff7f50;
  transition: all 0.1s ease;

  &:hover {
    background-color: #f56f3fff;
  }
`;
