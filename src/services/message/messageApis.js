import { instance } from "../services/instance";

export const getMessageListReq = async (crewId, cursorMessageId, size) => {
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
