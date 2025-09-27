import { css } from "@emotion/react";

export const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const container = css`
  width: 450px;
  height: 550px;
  border-radius: 23px;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.3);
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
`;

export const imageBox = css`
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const noImgBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #888;
  opacity: 0.8;
  font-size: 14px;
  background-color: #ddddddff;
  gap: 7px;

  & > svg {
    fill: #777;
    font-size: 55px;
  }
`;

export const contentBox = css`
  width: 100%;
  flex-grow: 1;
  padding: 15px 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-sizing: border-box;
`;

export const crewLeaderBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const profileImgBox = css`
  width: 42px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
    object-fit: cover;
  }
`;

export const crewLeader = css`
  display: flex;
  flex-direction: column;

  & > span:first-of-type {
    font-size: 14px;
    font-weight: 500;
    color: #555;
  }

  & > span:last-of-type {
    font-size: 17px;
    font-weight: 600;
  }
`;

export const crewName = css`
  width: 100%;
  height: 32px;
  font-size: 26px;
  margin: 0;
`;

export const crewDetail = css`
  width: 100%;
  height: 90px;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const crewInfoGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const metaItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & > svg {
    font-size: 20px;
    color: #00296b;
  }

  :first-of-type > svg {
    font-size: 22px;
  }

  & > strong {
    font-size: 16px;
    font-weight: 600;
  }
  & > span {
    font-size: 13px;
    color: #666;
    font-weight: 400;
  }
`;

export const joinBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;

  & > span {
    padding: 7px 26px;
    outline: none;
    border: none;
    border-radius: 23px;
    font-size: 18px;
    font-weight: 600;
    background-color: #00296b;
    color: #eeeeee;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #f57c00;
    }
  }
`;
