import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 50px;
  background-color: #f0f0f0ff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

export const navLink = (isActive) => css`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  color: #666;
  border-bottom: 2px solid transparent;

  /* navLink가 제공하는 클래스 */
  &.active {
    color: #0d47a1;
    border-bottom: 2px solid #0d47a1;
  }

  & :hover {
    background-color: #efeff2;
  }

  transition: all 0.2s ease-in-out;

  & > svg {
    font-size: 22px;
    transform: translateY(2px);
  }
`;
