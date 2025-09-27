import { css } from "@emotion/react";

export const profileImgBox = css`
  position: relative;
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const profileImg = css`
  width: 120px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.05);
  background-color: #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const changeImageButton = css`
  background: none;
  color: #1a4d8c;
  border: none;
  border-radius: 16px;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    font-weight: 700;
  }
`;

export const nicknameBox = css`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const inputGroup = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 5px;

  & > p {
    padding: 0;
    margin: 5px 0;
  }
`;

export const label = css`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin-left: 5px;
`;

export const input = css`
  width: 100%;
  padding: 12px 15px;
  outline: 2px solid #cdcdcd;
  background-color: #f8f9fa;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline-color: #0d47a1;
  }

  &::placeholder {
    opacity: 0.7;
  }
`;

export const errorMessage = (isAvailable) => css`
  font-size: 12px;
  color: ${isAvailable ? "green" : "red"};
  margin-top: 5px;
  align-self: flex-end;
`;

export const buttonContainer = css`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const cancelButton = css`
  background-color: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 15px;
  padding: 6px 16px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e6f3;
    color: #1a4d8c;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scale(0.95);
    background-color: #c9d2e7;
  }
`;

export const saveButton = css`
  background-color: #04327c;
  color: #fefefe;
  border: none;
  border-radius: 14px;
  padding: 6px 16px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f57c00;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background-color: #b0c4de;
    cursor: default;
  }
`;
