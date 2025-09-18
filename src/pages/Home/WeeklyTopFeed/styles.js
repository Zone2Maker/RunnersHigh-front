import { css } from "@emotion/react";

export const container = css`
  margin: 0 20px;
  background-color: #fafafaff;
  border-radius: 35px;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  overflow: hidden;
`;

export const titleContainer = css`
  width: 100%;
  padding: 20px 30px 10px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background-color: #d7d7d7;

  & > div:nth-of-type(2) {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    & > div:nth-of-type(2) {
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        font-weight: 700;
      }
    }

    &:hover {
      font-weight: 700;
    }
  }
`;

export const title = css`
  flex-grow: 1;
  font-size: 24px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;

  & > svg {
    font-size: 50px;
    color: #0d47a1;
    transform: translateY(4px);
  }

  & span {
    font-size: 28px;
    font-weight: 700;

    & > svg {
      font-size: 24px;
      color: #e43636;
      transform: translateY(3px);
    }
  }
`;

export const feedContainer = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
`;

export const feed = css`
  aspect-ratio: 1;
  /* background-color: #fafafaff; */
  background-color: whitesmoke;

  & > img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

export const footer = css`
  width: 100%;
  height: 30px;
`;
