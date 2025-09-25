import { create } from "zustand";

export const useLocationState = create((set) => ({
  // 지도 초기 위치,서울시청
  location: {
    lat: 37.5642135,
    lng: 127.0016985,
  },
  isLoading: true,
  error: null,
  syncLocation: ({ location, isLoading, error }) => {
    set({ location, isLoading, error });
  },
}));
