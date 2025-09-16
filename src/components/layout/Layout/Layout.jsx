/** @jsxImportSource @emotion/react */
import Header from "../Header/Header";
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import * as s from "./styles";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getPrincipalReq } from "../../../services/auth/authApis";
import { useQuery } from "@tanstack/react-query";
import { usePrincipalState } from "../../../stores/usePrincipalState";

function Layout() {
  const accessToken = localStorage.getItem("accessToken");
  const { login, logout } = usePrincipalState();
  const { data, isLoading} = useQuery({
    queryKey: ["getPrincipal"],
    queryFn: getPrincipalReq,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data?.data.status === "success") {
      login(data?.data?.data);
    } else if (data?.status === 401 || data?.data?.status === "failed") {
      // 토큰 만료/위조된 경우 처리
      localStorage.removeItem("accessToken");
      logout();
    }
  }, [data, login, logout]);

  return (
    <div css={s.container}>
      {isLoading ? (
        "" //로딩 스피너
      ) : (
        <>
          <Header />
          <Outlet />
          <BottomNavBar />
        </>
      )}
    </div>
  );
}

export default Layout;
