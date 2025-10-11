import { instance } from "../instance/instance";

export const addDiaryReq = async (data) => {
  try {
    const response = await instance.post("/diary", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateDiaryReq = async (data) => {
  try {
    const response = await instance.post("/diary/update", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

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

export const getDiaryDetailByDateReq = async (date) => {
  try {
    const response = await instance.get(`/diary?date=${date}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
