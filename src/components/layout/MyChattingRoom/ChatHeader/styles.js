import { css } from "@emotion/react";

export const chatHeader = (isLeaveConfirmOpen) => css`
  width: 100%;
  height: 65px;
  flex-shrink: 0;
  background-color: #ff8812ff;
  color: #fcfcfc;
  box-shadow: 0 4px 6px -1px rgba(70, 70, 70, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.06);

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 15px 7px;
  box-sizing: border-box;

  filter: ${isLeaveConfirmOpen && "blur(0.5px)"};

  & > svg {
    font-size: 21px;
    transform: translateY(2px);
    color: #fcfcfc;
    cursor: pointer;
    transform: all 0.2 ease;

    &:hover {
      scale: calc(1.03);
    }
  }
`;

export const crewProfile = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin: 0;

  & > img {
    width: 38px;
    height: 38px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const crewInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3px;

  & > span:nth-of-type(1) {
    font-size: 16px;
    font-weight: 500;
  }

  & > span:nth-of-type(2) {
    font-size: 13px;

    & > svg {
      transform: translateY(1px);
    }
  }
`;
