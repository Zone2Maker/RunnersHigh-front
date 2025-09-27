import { css } from "@emotion/react";

export const btnNav = css`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background-color: #f8f9fa;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px;
  box-sizing: border-box;
`;

export const changeBtnContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 470px;
  padding: 8px 10px;
  border-radius: 23px;
  background-color: #e9e9e9ff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const left = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const tapBtn = css`
  border: none;
  padding: 0;
  cursor: pointer;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f7f8;
  color: #5f6368;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  transition: all 0.2s ease, transform 0.1s ease-out;

  & svg {
    font-size: 24px;
    font-weight: 400;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const isActive = css`
  background-color: #00296b;
  color: #efefef;
`;

export const addBtn = css`
  width: 36px;
  height: 36px;
  background-color: #00296b;
  color: #fefefe;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 400;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease-out;

  &:hover {
    background-color: #f57c00;
  }

  &:active {
    transform: scale(0.95);
  }
`;
