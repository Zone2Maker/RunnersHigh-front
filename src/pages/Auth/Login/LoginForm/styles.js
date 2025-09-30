import { css } from "@emotion/react";

export const loginForm = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  * {
    box-sizing: border-box;
  }

  & > div {
    overflow: visible !important;
  }

  & > div input {
    border: 1px solid #e8e8e8 !important;
    border-radius: 0 !important;
    background-color: #fefefe;
    padding: 18px 16px;
    outline: none;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    position: relative;
    z-index: 0;
  }

  & > div input:first-of-type {
    border-radius: 10px 10px 0 0 !important;
  }

  & > div input:last-of-type {
    border-radius: 0 0 10px 10px !important;
  }

  & > div input:focus {
    border-color: #0d47a1 !important;
    box-shadow: 0 0 0 1px #0d47a1;
    z-index: 1;
  }
`;
