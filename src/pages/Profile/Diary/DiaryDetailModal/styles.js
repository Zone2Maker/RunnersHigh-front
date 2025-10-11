import { css } from "@emotion/react";

export const container = css`
  width: 400px;
  height: 460px;
  padding: 40px 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  background-color: #f9f9f9;
`;

export const date = css`
  font-size: 15px;
  font-weight: 500;
  color: #555;
`;

export const title = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 0;
  margin-bottom: 5px;

  & > span {
    font-size: 24px;
    font-weight: 700;
  }

  & > svg {
    font-size: 21px;
    color: #00296b;
  }
`;

export const content = css`
  width: 100%;
  height: 100%;
  font-size: 17px;
  font-weight: 500;
  margin: 0;
  padding: 20px;
  background-color: #eeeeee;
  border-radius: 12px;
  text-align: left;

  & > p {
    margin: 0;
    white-space: pre-wrap;
    line-height: 1.4;
  }
`;

export const btnContainer = css`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
`;

export const btn = css`
  font-size: 14px;
  font-weight: 600;
  padding: 7px 26px;
  outline: none;
  border: none;
  border-radius: 23px;
  transition: all 0.2s;
  cursor: pointer;
`;

export const deleteBtn = css`
  background-color: #dadadaff;
  color: #666;

  &:hover {
    color: #fefefe;
    background-color: #f57c00;
  }
`;

export const modifyBtn = css`
  color: #eeeeee;
  background-color: #00296b;

  &:hover {
    background-color: #f57c00;
  }
`;
