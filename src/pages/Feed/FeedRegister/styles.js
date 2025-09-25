import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  z-index: 10;
`;

// --- 메인 콘텐츠 ---
export const mainContainer = css`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

// --- 장소 검색 ---
export const inputBox = css`
  width: 100%;
  display: flex;
  position: relative;
`;

export const searchInput = css`
  flex-grow: 1;
  padding: 12px 40px 12px 15px; /* 아이콘 공간 확보 */
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #d9d9d9;
  font-size: 18px;
  font-weight: 500;
  outline: none;
  border: none;
  font-family: inherit;
`;

export const searchIcon = css`
  font-size: 30px;
  color: #0d47a1;
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
`;

export const selectedLocation = css`
  width: 100%;
  padding-left: 5px;
  display: flex;
  align-items: center;

  & > svg {
    font-size: 32px;
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
  background-color: ${isButtonDisabled ? "#d9d9d9" : "#0d47a1"};
  color: ${isButtonDisabled ? "#888" : "white"};
  font-size: 18px;
  font-weight: 500;
  border-radius: 15px;
  cursor: ${!isButtonDisabled && "pointer"};
`;

export const dummyContainer = css`
  height: 60px;
`;
