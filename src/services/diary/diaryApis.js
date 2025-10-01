import { instance } from "../instance/instance";

// 일지 추가
export const addDiaryReq = async (diaryData) => {
  try {
    const response = await instance.post("/diary", diaryData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

//월별 일지 등록 여부 조회
export const getActiveListByDateReq = async (year, month) => {
  try {
    const response = await instance.get(
      `/diary/calendar?year=${year}&month=${month}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

//일지 상세조회
export const getDiaryDetailByDateReq = async (date) => {
  try {
    const response = await instance.get(`/diary?date=${date}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
