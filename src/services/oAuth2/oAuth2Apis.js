import { instance } from "../instance/instance";

export const joinOAuth2UserReq = async (data) => {
  try {
    const response = await instance.post("/oauth2/join", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const mergeOAuth2UserReq = async (data) => {
  try {
    const response = await instance.post("/oauth2/merge", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
