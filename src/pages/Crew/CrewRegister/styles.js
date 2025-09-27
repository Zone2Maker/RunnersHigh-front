import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  padding: 15px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  background-color: #f8f9fa;
  overflow-y: hidden;
`;

export const subject = css`
  font-size: 21px;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding-left: 8px;
  box-sizing: border-box;
`;

export const imageInput = css`
  display: none;
`;

export const imgInput = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  border-radius: 15px;
  background-color: #d9d9d9;
  overflow: hidden;
  cursor: pointer;

  & > svg {
    color: #7d7d7d;
    font-size: 100px;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & p {
    margin: 0;
    padding: 0;
    color: #777;
    font-size: 16px;
  }
`;

export const box = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const textInput = css`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  border-radius: 15px;
  outline: 2px solid #b3b3b3;
  background-color: #f8f9fa;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    font-weight: 400;
  }
  &:focus-within {
    outline-color: #04327c;
  }
`;

export const textarea = css`
  width: 100%;
  height: 100px;
  padding: 12px 14px;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
  border: none;
  border-radius: 15px;
  outline: 2px solid #b3b3b3;
  background-color: #f8f9fa;
  resize: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    font-weight: 400;
  }
  &:focus-within {
    outline-color: #04327c;
  }
`;

export const regionAndMaxGroup = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 10px;
`;

export const dropdownContainer = css`
  width: 100%;
  position: relative;
`;

export const dropdownButton = (isDropDownOpen) => css`
  width: 100%;
  padding: 9px 15px;
  display: flex;
  justify-content: space-between;
  border: ${isDropDownOpen ? "2px solid #04327c" : "2px solid #b3b3b3"};
  border-radius: 15px;
  background-color: #f8f9fa;
  position: relative;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;

  & > svg {
    font-size: 20px;
  }
`;

export const region = css`
  font-size: 16px;
  font-weight: 500;
`;

export const dropdownMenu = (isDropDownOpen) => css`
  width: 100%;
  height: 200px;
  display: ${isDropDownOpen ? "block" : "none"};
  margin: 0;
  padding: 9px 15px;
  background-color: #fefefe;
  border-radius: 15px;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: all 0.4s ease;
  box-sizing: border-box;
  list-style: none;
  z-index: 20;
  overflow-y: auto;
  cursor: pointer;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 0px;
  }

  > li {
    color: inherit;
    text-align: center;
    border-bottom: 1.5px solid #d0d0d0;
    padding: 10px 0px;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export const btnContainer = css`
  width: 100%;
  display: flex;
`;

export const registerBtn = css`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  color: #efefef;
  background-color: #00296b;

  &:hover {
    background-color: #f57c00;
  }
`;
