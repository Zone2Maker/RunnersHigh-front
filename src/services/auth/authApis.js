// Auth 관련 api

import { instance } from "../instance/instance";



//회원가입
export const signupReq = async (data) => {
  try {
    const response = await instance.post("/auth/join", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//로그인
export const signinReq = async (data) => {
  try {
    const response = await instance.post("/auth/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//getPrincipal
export const getPrincipalReq = async () => {
  try {
    const response = await instance.get("/principal"); 
    return response;
  } catch (error) { 
    console.error("Principal 정보 조회 중 오류 발생:", error);
    return error.response;
  }
};

