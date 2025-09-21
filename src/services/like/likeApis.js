import { instance } from "../instance/instance";

export const addLikeReq = async (data) => {
  try {
    const response = await instance.post("/feed/like", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const removeLikeReq = async (data) => {
  try {
    const response = await instance.post("/feed/unlike", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
