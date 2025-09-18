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
