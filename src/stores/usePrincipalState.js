import { create } from "zustand";
import { queryClient } from "../configs/queryClient";

export const usePrincipalState = create((set) => ({
  isAuthenticated: false, //더 직관적인 명명(isLoggedIn)
  principal: null,

  login: (userData) => set({ isAuthenticated: true, principal: userData }),

  logout: () => {
    localStorage.removeItem("accessToken");
    queryClient.removeQueries(); //캐시 제거
    set({ isAuthenticated: false, principal: null });
    window.location.href = "/auth/login";
  },
}));
