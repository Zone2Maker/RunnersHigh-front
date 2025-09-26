import { css } from "@emotion/react";

export const container = css`
  width: 480px;
  min-height: calc(100vh - 120px);
  margin: 0 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const stickyContainer = css`
  width: 100%;
  height: 190px;
  max-width: 500px;
  background-color: #efefef;
  padding: 10px;
  position: fixed;
  top: 60px;
  background-color: white;
  z-index: 2;
  box-sizing: border-box;
`;

export const profileMain = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  margin-top: 190px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  border: 1px solid #e6e6e6ff;
`;
