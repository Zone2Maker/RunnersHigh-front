import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  margin-top: 106px;
  box-sizing: border-box;
  background-color: #f8f9fa;
`;

export const header = css`
  width: 500px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  padding-bottom: 0px;
  position: fixed;
  top: 60px;
  box-sizing: border-box;
  z-index: 10;
  gap: 7px;
  background-color: #f8f9fa;
`;

export const searchContainer = css`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 50px;
  outline: 2px solid #cdcdcd;
  background-color: #f8f9fa;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &:focus-within {
    outline-color: #0d47a1;
    background-color: #efefef;
  }
`;

export const searchInput = css`
  width: 100%;
  height: 48px;
  padding: 0 60px 0 20px;
  box-sizing: border-box;
  border: none;
  background-color: none;
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  outline: none;

  &::placeholder {
    font-weight: 400;
  }
`;

export const searchBtn = css`
  position: absolute;
  right: 12px;
  top: 17%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > svg {
    font-size: 32px;
    color: #04327c;
    transition: all 0.2s;

    &:hover {
      color: #f57c00;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const selectedRegion = css`
  padding: 5px 8px;
  display: inline-flex;
  background-color: #e5e8f8ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 3px;
  cursor: pointer;
  transition: all 0.2s ease;

  & > span {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #444;
    box-sizing: border-box;
  }

  & > svg {
    font-size: 14px;
    color: #00296b;
    stroke-width: 0.5px;
  }

  &:hover {
    background-color: #0d47a1;

    & > * {
      color: #e7e7e7ff;
    }
  }
`;

export const filterContainer = (isRegionSelected) => css`
  width: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: ${isRegionSelected ? "space-between" : "flex-end"};
  align-items: center;
`;

export const filter = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const filterBtn = css`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f57c00;
    font-weight: 600;
  }
`;

export const newCrew = css`
  & > svg {
    font-size: 14px;
    transform: translateY(2px);
  }
`;

export const seperator = css`
  width: 1px;
  height: 16px;
  background-color: #c4c4c4;
`;

export const dropdownContainer = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const selectRegion = css`
  transform: translateY(-1px);

  & > svg {
    // 드롭다운 아이콘
    font-size: 17px;
    transform: translateY(2px);
  }
`;

// export const regionList = (isDropDownOpen) => css`
//   display: ${isDropDownOpen ? "block" : "none"};
//   opacity: ${isDropDownOpen ? 1 : 0};
//   transform: ${isDropDownOpen ? "translateY(0)" : "translateY(40px)"};
//   transition: all 0.5s ease;
//   position: absolute;
//   top: 110%;
//   right: -10px;
//   width: 80px;
//   height: 125px;
//   border-radius: 10px;
//   background-color: #fefefe;
//   border: 1px solid #e9ecef;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   box-sizing: border-box;
//   margin: 0;
//   padding: 5px;
//   list-style: none;
//   z-index: 20;
//   overflow-y: auto;
//   cursor: pointer;

//   // 스크롤바 숨기기
//   &::-webkit-scrollbar {
//     width: 0px;
//   }
// `;

export const regionList = (isDropDownOpen) => css`
  display: ${isDropDownOpen ? "block" : "none"};
  opacity: ${isDropDownOpen ? 1 : 0};
  transform: ${isDropDownOpen ? "translateY(0)" : "translateY(40px)"};
  transition: all 0.5s ease;
  position: absolute;
  top: 110%;
  right: -10px;
  width: 80px;
  height: 125px;
  border-radius: 10px;
  background-color: #fefefe;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0;
  padding: 5px;
  list-style: none;
  z-index: 20;
  overflow-y: auto;
  cursor: pointer;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const regionItem = (isSelected) => css`
  margin: 2px 0;
  padding: 6px 8px;
  text-align: center;
  font-size: 15px;
  font-weight: ${isSelected ? "600" : "500"};
  border-bottom: ${isSelected && "1px solid #e2e1e1"};
  background-color: ${isSelected ? "#F1F3FF" : "transparent"};
  border-radius: 8px;
  transition: border-bottom 0.3s ease-in-out, background-color 0.2s ease;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    margin: 0;
    padding: 0;
    line-height: 18px;
  }

  & > svg {
    color: #00296b;
  }

  &:hover {
    background-color: #f1f3ff;
    border-bottom: 1px solid #dfdfdfff;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;
