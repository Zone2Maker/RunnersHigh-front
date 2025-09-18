import { css } from "@emotion/react";

export const container = css`
  margin: 0 20px;
  padding: 25px 20px 20px;
  box-sizing: border-box;
  background-color: whitesmoke;
  border-radius: 35px;
  box-shadow: 0px 0px 2px 2px hsla(0, 0%, 82%, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #333;
`;

export const titleContainer = css`
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & > div:nth-of-type(2) {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      font-weight: 700;
    }
  }
`;

export const title = css`
  flex-grow: 1;
  font-size: 24px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;

  & > svg {
    font-size: 55px;
    color: #0d47a1 !important;
  }

  & span {
    font-size: 32px;
    font-weight: 700;
  }
`;

export const crewList = css`
  background-color: #fefefe;
  border-radius: 35px;
  height: 220px;
  list-style: none;
  margin: 0;
  padding: 20px;
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
  border-bottom: 1px solid #f0f0f0; // 얇은 구분선 추가
  font-weight: 500;
  color: #333;

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
  font-weight: 600;
  text-align: center;

  & > svg {
    color: ${rank === 0
      ? "#FFD700"
      : rank === 1
      ? "#C0C0C0"
      : rank === 2
      ? "#CD7F32"
      : "#333"};
    transform: translateY(3px);
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 4px 8px;

  & > svg {
    color: #f03131ff;
  }
`;
