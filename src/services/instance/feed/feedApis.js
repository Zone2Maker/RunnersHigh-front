import { instance } from "../instance";

// 피드 추가
export const addFeed = async (data) => {
  // 호출 할 때 마다 토큰 체크 & 헤더 추가
  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  try {
    const response = await instance.post("/feed", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 피드 목록 조회
export const getFeedList = async (userId, cursorFeedId, size) => {
  try {
    const response = await instance.get("/feed", {
      params: {userId, cursorFeedId, size}
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
