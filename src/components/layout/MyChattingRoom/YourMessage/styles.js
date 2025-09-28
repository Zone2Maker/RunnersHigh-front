import { css } from "@emotion/react";

export const messageContainer = css`
  width: 100%;
  display: flex;
  justify-content: left;
  gap: 5px;

  & > img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 3px;

    > span {
      font-size: 13px;
    }
  }
`;

export const messageBox = css`
  background-color: #f0f0f0;
  border-radius: 0 10px 10px 10px;
  padding: 5px 10px;
  max-width: 250px;
  box-sizing: border-box;
  display: flex;

  & > p {
    margin: 0;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 15px;
    line-height: 19px;
    font-weight: 500;
  }
`;

export const timeBox = css`
  height: 100%;
  display: flex;
  justify-content: end;

  > p {
    margin: 0;
    font-size: 10px;
    color: #555;
  }
`;
