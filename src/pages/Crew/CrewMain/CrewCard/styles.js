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
`;

export const imgBox = css`
  width: 100%;
  height: 136.5px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    margin-left: 10px;
    font-size: 14px;

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
    margin: 5px 0px 10px 10px;
    font-size: 13px;
    color: #707070;
  }
`;
