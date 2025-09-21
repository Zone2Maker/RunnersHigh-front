import { css } from "@emotion/react";

export const card = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0px 5px 8px -5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: 1px solid #e3e3e3;
`;

export const imgBox = css`
  width: 100%;
  height: 136.5px;
  border-bottom: 1px solid #e3e3e3;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const noImgBox = css`
  width: 100%;
  height: 136.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  opacity: 0.8;
  font-size: 12px;
  border-bottom: 1px solid #e3e3e3;

  > svg {
    fill: #777;
    font-size: 48px;
  }
`;

export const contentBox = css`
  width: 100%;
  height: 101px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  word-break: keep-all;
  word-wrap: break-word;

  > span {
    display: flex;
    align-items: center;
    gap: 1px;
    font-size: 10px;
    color: #8b8b8b;

    > svg {
      color: #515151ff;
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    font-size: 14px;
    box-sizing: border-box;

    > p {
      margin: 0;
    }

    > div {
      display: flex;
      align-items: center;
      margin: 0;
      gap: 3px;
      color: #4c4c4c;

      > span:first-of-type {
        color: #b6b6b6;
      }
    }
  }

  > p {
    box-sizing: border-box;
    margin: 0;
    padding: 5px 0px 10px 10px;
    font-size: 13px;
    color: #707070;
  }
`;

export const cardDetail = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 30px 30px 30px;
  box-sizing: border-box;
`;

export const cardDetailImgBox = css`
  width: 100%;
  height: 195.8px;
  border-radius: 20px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const cardDetailNoImgBox = css`
  width: 100%;
  height: 195.8px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  opacity: 0.8;
  font-size: 15px;
  border: 1px solid #888;

  > svg {
    fill: #777;
    font-size: 55px;
  }
`;

export const cardDetailContentBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px 5px 20px 15px;
  box-sizing: border-box;
  word-break: keep-all;
  word-wrap: break-word;

  > span {
    display: flex;
    align-items: center;
    gap: 1px;
    font-size: 12px;
    color: #8b8b8b;

    > svg {
      color: #515151ff;
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    font-size: 20px;

    > p {
      margin: 0;
    }

    > div {
      display: flex;
      align-items: center;
      margin: 0;
      gap: 3px;
      color: #4c4c4c;
      font-size: 18px;

      > span:first-of-type {
        color: #b6b6b6;
      }
    }
  }

  > p {
    box-sizing: border-box;
    margin: 0;
    padding-top: 10px;
    font-size: 15px;
    color: #707070;
  }
`;

export const cardDetailBtnBox = css`
  text-align: center;
  > button {
    outline: none;
    border: none;
    border-radius: 40px;
    font-size: 20px;
    padding: 15px 70px;
    background-color: #d9d9d9;
    cursor: pointer;
  }
`;
