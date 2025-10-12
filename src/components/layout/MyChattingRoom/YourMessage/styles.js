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
export const box = css`
  display: flex;
  align-items: end;
  gap: 5px;

  > p {
    margin: 0;
    font-size: 10px;
    color: #555;
  }
`;
export const messageBox = css`
  width: fit-content;
  background-color: #f0f0f0;
  border-radius: 0 10px 10px 10px;
  padding: 5px 10px;
  max-width: 250px;
  box-sizing: border-box;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 19px;
  font-weight: 500;
`;
