import { css } from "@emotion/react";

export const input = (disabled) => css`
  width: 100%;
  padding: 18px 16px;
  outline: none;
  border: none;

  font-size: 1rem;
  background-color: #fefefe;

  color: ${disabled ? "#555555" : "#333"};
  user-select: ${disabled && "none"};
  pointer-events: ${disabled && "none"};

  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &:first-of-type {
    border-radius: 9px 9px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 9px 9px;
  }

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #0d47a1;
    box-shadow: 0 0 0 1px #0d47a1;
    z-index: 1;
  }

  &:hover {
    cursor: pointer;
  }
`;
