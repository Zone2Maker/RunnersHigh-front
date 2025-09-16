/** @jsxImportSource @emotion/react */
import Header from "../Header/Header";
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import * as s from "./styles";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div css={s.container}>
      <>
        <Header />
        <Outlet />
        <BottomNavBar />
      </>
    </div>
  );
}

export default Layout;
