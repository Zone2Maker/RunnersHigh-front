import { css } from "@emotion/react";

export const chatMain = (isLeaveModalOpen, isDeleteModalOpen) => css`
  width: 100%;
  flex-grow: 1;
  padding: 0 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  filter: ${(isLeaveModalOpen || isDeleteModalOpen) && "blur(0.5px)"};

  &::-webkit-scrollbar {
    width: 5px;
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

export const observer = css`
  width: 100%;
  height: 1px;
`;
