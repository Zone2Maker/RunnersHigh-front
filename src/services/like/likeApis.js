import { instance } from "../instance/instance";

export const addLikeReq = async (data) => {
  try {
    const response = await instance.post("/feed/like", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeLikeReq = async (data) => {
  try {
    const response = await instance.post("/feed/unlike", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
