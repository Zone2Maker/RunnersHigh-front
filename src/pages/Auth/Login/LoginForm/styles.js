import { css } from "@emotion/react";

export const loginButton = css`
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border: none;
  background-color: #555;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;