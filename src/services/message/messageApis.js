import { instance } from "../services/instance";

export const getMessageListRequest = async (crewId, cursorMessageId, size) => {
  try {
    const response = await instance.get("/crew", {
      params: {
        crewId: crewId,
        cursorMessageId: cursorMessageId,
        size: size,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
