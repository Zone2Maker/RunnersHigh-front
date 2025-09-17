import { instance } from "../services/instance";

export const getMessageListReq = async (crewId, cursorMessageId, size) => {
  try {
    const response = await instance.get(`/crew/${crewId}/messages`, {
      params: {
        cursorMessageId: cursorMessageId,
        size: size,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
