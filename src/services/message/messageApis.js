import { instance } from "../instance/instance";

export const getInitialMessageListReq = async (
  crewId,
  cursorMessageId,
  size
) => {
  try {
    const response = await instance.get(`/crews/${crewId}/messages/initial`, {
      params: {
        cursorMessageId: cursorMessageId,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessageListReq = async (
  crewId,
  cursorMessageId,
  direction,
  size
) => {
  try {
    const response = await instance.get(`/crews/${crewId}/messages`, {
      params: {
        cursorMessageId: cursorMessageId,
        direction: direction,
        size: size,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLastReadMessageIdReq = async (crewId) => {
  try {
    const response = await instance.get(`/crews/${crewId}/messages/last-read`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLastReadMessageIdReq = async (crewId) => {
  try {
    const response = await instance.post(
      `/crews/${crewId}/messages/read-update`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUnreadMessageCountReq = async (crewId) => {
  try {
    const response = await instance.get(
      `/crews/${crewId}/messages/unread-count`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
