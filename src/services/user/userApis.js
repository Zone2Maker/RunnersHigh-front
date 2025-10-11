import { instance } from "../instance/instance";

export const getUserInfoReq = async (userId, email, nickname) => {
  try {
    const response = await instance.get("/user/info", {
      params: {
        userId: userId,
        email: email,
        nickname: nickname,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkUserExistReq = async (email, nickname) => {
  try {
    const response = await instance.get("/user/check", {
      params: {
        email: email,
        nickname: nickname,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserReq = async (data) => {
  try {
    const response = await instance.post("/user/update", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserReq = async (data) => {
  try {
    const response = await instance.post("/user/delete", data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
