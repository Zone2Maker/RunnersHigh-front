import { css } from "@emotion/react";

export const chatBox = css`
  position: fixed;
  right: 50px;
  bottom: 120px;
  width: 350px;
  height: 550px;
  border-radius: 30px;
  background-color: #dfdfdf;
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.4s ease;
  overflow: hidden;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  z-index: 100;
`;

export const chatHeader = css`
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0;

  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: inherit;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    align-items: center;

    > p {
      margin: 0;
      font-size: 15px;
    }

    > img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  > svg {
    font-size: 20px;
    transform: translateY(5px);
    cursor: pointer;
    color: #333;
  }
`;

export const chatMain = css`
  width: 100%;
  height: calc(100% - 50px - 70px);
  margin-top: 50px;
  margin-bottom: 70px;
  padding: 0 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

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

export const myChat = css`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 5px;

    > div {
      background-color: #d3d3d3;
      border-radius: 8px 0 8px 8px;
      padding: 5px 10px;
      max-width: 250px;
      box-sizing: border-box;

      > p {
        margin: 0;
        word-break: keep-all;
        word-wrap: break-word;
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
`;

export const yourChat = css`
  width: 100%;
  display: flex;
  justify-content: left;
  gap: 10px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;

    > span {
      font-size: 14px;
    }

    > div {
      background-color: #d3d3d3;
      border-radius: 0 8px 8px 8px;
      padding: 5px 10px;
      max-width: 250px;
      box-sizing: border-box;
      display: flex;

      > p {
        margin: 0;
        word-break: keep-all;
        word-wrap: break-word;
        font-size: 15px;
        line-height: 20px;
      }
      >span{

      }
    }
  }

  > img {
    width: 22px;
    height: 22px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const systemChat = css`
  max-width: 240px;
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 15px;
  color: #6b6b6b;
  background-color: #b4b4b4;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const lastReadMessageBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const chatInput = css`
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 0;
  z-index: 50;
  background-color: #fff;
  padding: 10px;
  display: flex;

  > textarea {
    flex-grow: 1;
    padding: 5px;
    box-sizing: border-box;
    font-family: inherit;
    outline: none;
    border: none;
    resize: none;
    height: 40px;
    border-radius: 0 0 0 20px;
  }

  > textarea::placeholder {
    color: #d9d9d9;
  }

  > svg {
    transform: translateY(5px);
    font-size: 18px;
    margin: 5px;
    color: #333;
  }
`;
