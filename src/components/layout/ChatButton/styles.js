import { css } from "@emotion/react";

export const container = css`
  width: 60px;
  height: 60px;
  background-color: #efefef;
  /* background-color: #0d47a1; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #efefef;
  /* border-radius: 24px; */
  border-radius: 43%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  & > svg {
    width: 42px;
    height: 42px;
    color: #0d47a1;
    /* color: #efefef; */
  }
`;

export const notiDot = css`
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #fc4747ff;
  box-shadow: 0 3px 3px 0 rgba(143, 143, 143, 0.25);
  top: 2px;
  right: 0;
`;
