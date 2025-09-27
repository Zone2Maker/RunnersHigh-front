import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  z-index: 10;
`;

// --- 메인 콘텐츠 ---
export const mainContainer = css`
  width: 100%;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  box-sizing: border-box;
`;

// --- 장소 검색 ---
export const inputBox = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const searchInput = css`
  width: 100%;
  height: 48px;
  padding: 0 60px 0 20px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 50px;
  outline: 2px solid #cdcdcd;
  background-color: #f8f9fa;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &:focus-within {
    outline-color: #0d47a1;
  }

  &::placeholder {
    font-weight: 400;
  }
`;

export const searchIcon = css`
  font-size: 32px;
  color: #00296b;
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    color: #f57c00;
  }
`;

export const selectedLocation = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2px;

  & > svg {
    font-size: 28px;
    stroke-width: 1px;
    color: #0d47a1;
  }
`;

export const selectedPlace = css`
  font-size: 20px;
  font-weight: 500;
`;

// --- 이미지 업로드 ---
export const imageUploadSection = css`
  flex-grow: 1;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  border-radius: 15px;
`;

export const feedNoImageBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  color: #888;
  opacity: 0.8;
  font-size: 16px;

  & > svg {
    fill: #777;
    font-size: 90px;
    opacity: 0.7;
  }
`;

export const previewImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const feedInput = css`
  display: none;
`;

// ---- 검색 결과 목록 -----
export const placeContainer = css`
  width: 480px;
  height: 550px;
  border-radius: 15px;
  background-color: #f4f4f4;
  position: absolute;
  top: 65px;
  z-index: 1;
`;

export const placeList = css`
  width: 480px;
  height: 550px;
  list-style: none;
  overflow-y: auto;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #efefef;
  padding: 0;
  position: absolute;
  top: 55px;
  z-index: 1;

  //스크롤바 커스텀
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #efefef;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #efefef; /* 스크롤 트랙 색 */
    border-radius: 6px;
  }

  & > li:last-of-type {
    border-bottom: none;
  }
`;

export const placeInfo = css`
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  gap: 5px;

  &:hover {
    background-color: #d9d9d9;
  }
  & > span {
    margin: 0;
    padding: 0;
  }
`;

export const nameAndCategory = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h3 {
    margin: 0;
    margin-top: 5px 0;
    font-size: 20px;
    font-weight: 700;
  }

  & > div {
    font-size: 14px;
    color: #555;
  }
`;

// --- 공유하기 버튼 ---
export const submitButton = (isButtonDisabled) => css`
  padding: 12px 14px;
  border: none;
  outline: none;
  background-color: ${isButtonDisabled ? "#d9d9d9" : "#00296b"};
  color: ${isButtonDisabled ? "#888" : "#eeeeee"};
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  cursor: ${!isButtonDisabled && "pointer"};

  &:hover {
    background-color: ${!isButtonDisabled && "#f57c00"};
  }
`;

export const dummyContainer = css`
  height: 60px;
`;
