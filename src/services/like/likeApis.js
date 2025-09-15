import { instance } from "../services/instance";

export const addLikeReq = async (data) => {
  try {
    const response = await instance.post("/like", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removeLikeReq = async (data) => {
  try {
    const response = await instance.post("/unlike", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
