import axios from "axios";

// 백엔드로 보내는 인스턴스 하나 생성
export const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// interceptors -> 요청 보내기 전에 가로채서 header에 accessToken 넣어줌
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
