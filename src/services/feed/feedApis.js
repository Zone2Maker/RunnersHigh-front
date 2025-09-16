import { instance } from "../instance/instance";

// 피드 추가
export const addFeedReq = async (data) => {
  try {
    const response = await instance.post("/feed", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 피드 목록 조회
export const getFeedListReq = async (
  userId = null,
  cursorFeedId = 0,
  size = 12
) => {
  try {
    const response = await instance.get("/feed", {
      // 해당 값들은 파라미터로 받음
      params: { userId, cursorFeedId, size },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 내가 좋아요한 피드 목록 조회
export const getILikedFeedListReq = async (
  userId = null,
  cursorFeedId = 0,
  size = 12
) => {
  try {
    const response = await instance.get("/feed/liked", {
      params: { userId, cursorFeedId, size },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 피드 상세 조회
export const getFeedDetailReq = async (feedId) => {
  try {
    const response = await instance.get(`/feed/${feedId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 주간 인기 피드 top 8 조회
export const getWeeklyTopFeedReq = async () => {
  try {
    const response = await instance.get("/feed/weekly-top");
    return response;
  } catch (error) {
    return error.response;
  }
};
