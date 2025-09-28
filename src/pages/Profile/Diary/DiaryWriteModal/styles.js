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
    stroke-width: 2.3;
    transform: translateY(1px);
  }
`;

export const text = css`
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: 12px;
  padding: 20px;
`;

export const textarea = css`
  width: 100%;
  height: 100%;
  font-size: 17px;
  font-family: inherit;
  white-space: pre-wrap;
  line-height: 1.4;
  text-align: left;
  border: none;
  resize: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    color: #888;
  }
`;

export const saveBtn = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  & > button {
    font-size: 14px;
    font-weight: 600;
    color: #eeeeee;
    background-color: #00296b;
    padding: 7px 26px;
    outline: none;
    border: none;
    border-radius: 23px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #f57c00;
    }
  }
`;
