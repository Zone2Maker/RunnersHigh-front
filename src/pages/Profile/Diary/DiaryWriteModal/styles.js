import { css } from "@emotion/react";

export const modalBody = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const modalHeader = css`
  font-size: 14px;
  color: #6b7280;
  margin-top: 40px;
`;

export const modalTitle = css`
  font-size: 22px;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

export const modalText = css`
  width: 100%;
  min-height: 250px;
  padding: 16px;
  background-color: #f3f4f6;
  border-radius: 12px;
  font-size: 16px;
  color: #374151;
  white-space: pre-wrap;
  line-height: 1.6;
  text-align: left;
`;

export const modalTextarea = css`
  width: 360px;
  height: 250px;
  padding: 16px;
  background-color: #f3f4f6;
  border-radius: 12px;
  font-size: 16px;
  color: #374151;
  line-height: 1.6;
  border: none;
  resize: none;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const modalActions = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

export const saveButton = css`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background-color: #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;
