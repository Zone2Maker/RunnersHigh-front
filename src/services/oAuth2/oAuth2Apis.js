import { instance } from "../services/instance";

export const joinOAuth2UserRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/join", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const mergeOAuth2UserRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/merge", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
