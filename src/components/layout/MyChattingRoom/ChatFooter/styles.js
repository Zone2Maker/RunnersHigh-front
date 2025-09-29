import { css } from "@emotion/react";

export const chatFooter = (isLeaveModalOpen) => css`
  width: 100%;
  min-height: 90px;
  max-height: 160px;
  flex-shrink: 0;
  background-color: #fefefe;
  padding: 12px;
  display: flex;
  align-items: flex-start;
  z-index: 50;
  gap: 10px;

  filter: ${isLeaveModalOpen && "blur(0.5px)"};

  > svg {
    transform: translateY(5px);
    font-size: 18px;
    margin: 5px;
    color: #333;
    cursor: pointer;
  }
`;

export const textarea = css`
  flex-grow: 1;
  max-height: 138px;
  box-sizing: border-box;
  margin-bottom: 5px;
  font-family: inherit;
  line-height: 1.27; // 한 줄 위로 올라갔을 때 잘리는 거 막음 ㅡㅡ;
  letter-spacing: 0.4px;
  outline: none;
  border: none;
  resize: none;
  overflow-y: auto;

  &::placeholder {
    color: #666;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: auto;
  }

  &::-webkit-scrollbar-thumb {
    background: #d3d3d3;
    border-radius: 10px;
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

export const sendBtn = css`
  padding: 0;
  border: none;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;
