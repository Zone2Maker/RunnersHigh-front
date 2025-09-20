import { css } from "@emotion/react";

export const profileImgBox = css`
  position: relative;
  width: 115px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const profileImg = css`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 2px 2px rgba(209, 209, 209, 0.25);
  background-color: #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const changeImageButton = css`
  background-color: #0d47a1;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0a56c9ff;
    font-weight: 500;
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
  border: 1px solid #0d47a1;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  font-family: inherit;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 2px solid #0d47a1;
  }

  &::placeholder {
    color: #666;
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
  gap: 8px;
  justify-content: flex-end;
`;

export const cancelButton = css`
  background-color: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 14px;
  padding: 6px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ccd3e2;
  }
`;

export const saveButton = css`
  background-color: #0d47a1;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 6px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0a56c9ff;
  }

  &:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
  }
`;
