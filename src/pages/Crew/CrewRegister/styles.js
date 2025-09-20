import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  padding: 30px 40px 90px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

export const box = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  color: #7d7d7d;

  > p {
    margin: 0;
    padding-left: 3px;
    box-sizing: border-box;
  }

  > input,
  textarea,
  div,
  button {
    outline: none;
    border: none;
    padding: 12px 15px;
    background-color: #d9d9d9;
    border-radius: 20px;
    box-sizing: border-box;
  }

  > input {
    line-height: 15.9px;
  }

  > textarea {
    height: 100px;
    resize: none;
    font-family: inherit;
  }

  > textarea::placeholder {
    font-size: 13px;
    font-family: inherits;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    > span {
      font-size: 13px;
    }

    > p {
      color: #000;
      margin: 0;
      font-size: 13px;
    }
  }

  > button {
    font-size: 20px;
    color: #000;
  }
`;

export const imgBox = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  color: #7d7d7d;

  > p {
    margin: 0;
    padding-left: 3px;
    box-sizing: border-box;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 246.6px;
    border-radius: 15px;
    background-color: #d9d9d9;
    overflow: hidden;

    > svg {
      color: #7d7d7d;
      font-size: 100px;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const dropdownBox = css`
  visibility: hidden;
  background-color: inherit;
  border-radius: 20px 0px 0px 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  opacity: 0;
  transition: all 0.4s ease;
  padding: 0px 10px;
  box-sizing: border-box;
  margin: 0;
  list-style: none;
  z-index: 100;
  cursor: pointer;
  overflow: auto;

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
