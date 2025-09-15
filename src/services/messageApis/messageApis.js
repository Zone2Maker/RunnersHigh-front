import { instance } from "../services/instance";

export const getMessageListRequest = async (crewId, cursorMessageId, size) => {
  try {
    const response = await instance.get(
      `crew/${crewId}/messages?cursorMessageId=${cursorMessageId}&size=${size}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
