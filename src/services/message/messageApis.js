import { instance } from "../instance/instance";

export const getMessageListReq = async (
  crewId,
  prevCursorId,
  nextCursorId,
  size,
  direction
) => {
  try {
    const response = await instance.get(`/crews/${crewId}/messages`, {
      params: {
        prevCursorId: prevCursorId,
        nextCursorId: nextCursorId,
        size: size,
        direction: direction,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getLastReadMessageIdReq = async (crewId) => {
  try {
    const response = await instance.get(`/crews/${crewId}/messages/last-read`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateLastReadMessageIdReq = async (crewId, lastReadMessageId) => {
  try {
    const response = await instance.post(
      `/crews/${crewId}/messages/read-update`,
      {}, // body 비우기
      { params: { lastReadMessageId } }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUnreadMessageCountReq = async (crewId) => {
  try {
    const response = await instance.get(
      `/crews/${crewId}/messages/unread-count`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
