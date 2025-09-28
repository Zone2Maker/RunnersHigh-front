import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  flex-grow: 1;
  z-index: 10;
  background-color: #f8f9fa;
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
  background-color: #f8f9fa;
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
  font-weight: 600;
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
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;

  & > div {
    display: flex;
    align-items: center;
    gap: 2px;

    & > svg {
      font-size: 28px;
      stroke-width: 1.2;
      color: #00296b;
    }
  }

  & > button {
    margin: 0;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 2px solid #00296b;
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    color: #00296b;
    font-size: 22px;
    cursor: pointer;

    & > svg {
    }

    &:hover {
      background-color: #00296b;
      color: #fefefe;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const selectedPlace = css`
  font-size: 21px;
  font-weight: 600;
`;

// --- 이미지 업로드 ---
export const imageUploadSection = css`
  width: 100%;
  height: 470px;
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

export const sourceInfo = css`
  width: 100%;
  text-align: right;
  padding: 0 10px;
  margin-top: 3px;
  font-size: 12px;
  color: #aaa;
`;

export const placeList = css`
  width: 480px;
  height: 540px;
  list-style: none;
  overflow-y: auto;
  border-radius: 15px;
  background-color: #fefefe;
  padding: 0;
  position: absolute;
  top: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
  box-sizing: border-box;

  //스크롤바 커스텀
  &::-webkit-scrollbar {
    width: 0px;
  }

  & > li:last-of-type {
    border-bottom: none;
  }
`;

export const placeInfo = css`
  width: 100%;
  padding: 8px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    color: #01255fff;
  }

  & > span {
    margin: 0;
    padding: 0;
    font-weight: 500;
    color: #444;
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
  }
`;

export const addressAndDistance = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span:nth-of-type(2) {
    font-size: 13px;
  }
`;

// --- 공유하기 버튼 ---
export const submitButton = css`
  width: 100%;
  display: flex;

  & > button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #efefef;
    background-color: #00296b;
    box-sizing: border-box;
    color: #fefefe;
    cursor: pointer;

    &:hover {
      background-color: #f57c00;
    }
  }
`;

export const dummyContainer = css`
  height: 58px;
`;
