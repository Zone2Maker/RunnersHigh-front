import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 143px;
`;

export const header = css`
  position: fixed;
  top: 60px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  height: auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10;
`;

export const inputBox = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 27px;
  background-color: #e3e3e3;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  > input {
    background-color: inherit;
    font-size: 17px;
    padding: 10px;
    flex-grow: 1;
    outline: none;
    border: none;
  }

  > svg {
    color: #7f7f7f;
    cursor: pointer;
  }
`;

export const clickBox = css`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;
  box-sizing: border-box;

  > span {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #595959;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
  }
`;

export const dropdownBox = css`
  visibility: hidden;
  background: #fff;
  border-radius: 20px 0px 0px 20px;
  border: 1px solid #f0f0f0;
  position: absolute;
  top: -15px;
  right: 10px;
  width: 150px;
  height: 400px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.4s ease;
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  z-index: 20;
  cursor: pointer;
  overflow: auto;

  > li {
    color: #8b8b8b;
    text-align: center;
    border-bottom: 1.5px solid #d0d0d0;
    padding: 10px 0px;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;
