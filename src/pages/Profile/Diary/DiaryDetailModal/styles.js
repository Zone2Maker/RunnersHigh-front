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
  font-size: 16px;
  color: #1f2937;
  width: 360px;
  height: 350px;
  margin: 0;
  white-space: pre-wrap;
  padding: 16px;
  background-color: #f3f4f6; 
  border-radius: 12px;
  text-align: left;
`;

export const modalTextarea = css`
  width: 100%;
  min-height: 120px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
`;

export const modalActions = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;


