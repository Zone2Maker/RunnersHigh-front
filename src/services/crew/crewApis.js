import { instance } from "../instance/instance";

export const addCrewReq = async (data) => {
  try {
    const response = await instance.post("/crew", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCrewListReq = async (cursorCrewId, size, search, region) => {
  try {
    const response = await instance.get("/crew", {
      params: {
        cursorCrewId: cursorCrewId,
        size: size,
        search: search,
        region: region,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCrewByCrewReq = async (crewId) => {
  try {
    const response = await instance.get(`/crew/${crewId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getWeeklyTopCrewsReq = async () => {
  try {
    const response = await instance.get("/crew/weekly-top");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const joinCrewReq = async (data) => {
  try {
    const response = await instance.post("/crew/join", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
