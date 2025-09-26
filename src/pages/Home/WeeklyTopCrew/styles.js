import { css } from "@emotion/react";

export const container = css`
  margin: 0 10px;
  padding: 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fefefe;
  border-radius: 35px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.09), 0px 1px 3px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const titleContainer = css`
  width: 100%;
  height: 60px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & > div:nth-of-type(2) {
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    color: #f57c00;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

export const title = css`
  flex-grow: 1;
  gap: 10px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;

  & > svg {
    font-size: 60px;
    stroke-width: 0.5px;
    color: #0d47a1 !important;
  }

  & span {
    font-size: 32px;
    font-weight: 700;
  }
`;

export const crewList = css`
  background-color: #f2f7ffff;
  border-radius: 35px;
  height: 210px;
  list-style: none;
  margin: 0;
  padding: 12px 15px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  & > li {
    margin: 0;
    padding: 0;
  }
`;

export const crewItem = (rank) => css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0; // 아이템 위아래로 여백을 줘서 공간 확보
  border-bottom: 2px solid #e7e7e7ff; // 얇은 구분선 추가
  font-weight: 600;
  font-size: ${rank === 0
    ? "25px"
    : rank === 1
    ? "23px"
    : rank === 2
    ? "21px"
    : "19px"};

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const rank = (rank) => css`
  padding: 0;
  margin: 0;
  width: 30px;
  text-align: center;

  & > svg {
    font-size: ${rank === 0
      ? "27px"
      : rank === 1
      ? "25px"
      : rank === 2
      ? "23px"
      : "19px"};

    color: ${rank === 0
      ? "#FFD700"
      : rank === 1
      ? "#CED4DA"
      : rank === 2
      ? "#E97451"
      : "#333"};
    transform: translateY(3px);
    stroke-width: 1px;
  }
`;

export const name = css`
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export const like = css`
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  background-color: #e7e7e7ff;
  border-radius: 20px;
  padding: 4px 8px;

  & > svg {
    color: #ff4500;
  }
`;
