import { css } from "@emotion/react";

export const pageContainer = css`
  flex: 1;
  width: 100%;
  background-color: black;
  z-index: 10;
`;

// --- 메인 콘텐츠 ---
export const mainContainer = css`
  flex: 1; /* 헤더와 하단 네비를 제외한 모든 공간 차지 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px; /* 요소 사이의 간격 */
`;

// --- 장소 검색 ---
export const locationSection = css`
  position: relative; //장소 리스트 띄우기 위함
  width: 100%;
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const searchInput = css`
  width: 440px;
  padding: 12px 40px 12px 15px; /* 아이콘 공간 확보 */
  margin: 20px;
  box-sizing: border-box;
  // border: 0.2px solid #333;
  border-radius: 15px;
  background-color: #d9d9d9;
  font-size: 17px;
  outline: none;
  border: none;
`;

export const searchIcon = css`
  // border: 1px solid #333;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: calc(50% - 220px + 10px); /* input의 오른쪽 끝에서 10px 안쪽으로 */
  transform: translateY(-50%);
  color: #888888;
`;

// --- 이미지 업로드 ---
export const imageUploadSection = css`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  height: 500px;
`;

export const plusIcon = css`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #888888;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: 300;
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
  font-size: 10px;

  & > svg {
    fill: #777;
    font-size: 40px;
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
export const resultList = css`
  flex-grow: 1;
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: #f4f4f4;
  // border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 4px 0;
  margin-top: 8px;
  max-height: 520px;
  overflow-y: auto;
  z-index: 100; //무조건 위에 오게

  //스크롤바 커스텀
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #868e96;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f4f4f4; /* 스크롤 트랙 색 */
  }
`;

export const resultItem = css`
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    background-color: #d9d9d9;
  }

  h4 {
    margin: 4px; 0 4px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333333;
    
  }

  h5 {
    margin: 10px;
    font-size: 14px;
    font-weight: 100;
    color: #4C4C4C;
  }

  span {
    font-size: 14px;
    margin-top: 15px;
    margin-right: 30px;
    margin-left: 4px;
    color: #707070;

  }
`;

export const placeInfo = css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 25px;
`;

// --- 공유하기 버튼 ---
export const submitButton = css`
  width: 420px;
  padding: 20px;
  margin: 30px 40px;
  border: none;
  background-color: #d9d9d9;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;
