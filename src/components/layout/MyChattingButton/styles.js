import { css } from "@emotion/react";

export const btn = (isChatOpen) => css`
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border: ${isChatOpen ? "3.5px solid #ff7f50" : "3.5px solid #0d47a1"};
  border-radius: 20px;
  background-color: #f7f7f7;
  text-align: center;
  line-height: 60px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    scale: ${isChatOpen ? "calc(0.98)" : "calc(1.02)"};
  }
`;

export const openBtn = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const bubble = css`
  font-size: 36px;
  color: #023e9e;
  stroke-width: 1.7;
`;

export const dot = css`
  position: absolute;
  font-size: 16px;
  color: #f17a02;
  top: -3px;
  right: -3px;
  z-index: 10;
`;

export const closeBtn = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    color: #ff7f50;
    font-size: 39px;
    stroke-width: 6;
    transform: translateY(1px);
  }
`;
