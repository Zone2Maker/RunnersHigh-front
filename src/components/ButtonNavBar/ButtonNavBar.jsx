import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoImagesOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavBar() {
  const navigate = useNavigate(); //페이지 이동
  const { pathname } = useLocation(); //현재 URL 경로 정보

  return (
    <nav css={s.navContainer}>
      //현재 경로(pathname)에 따라 active 스타일을 적용
      <div
        css={[s.navItem, pathname === "/" && s.activeNavItem]}
        onClick={() => navigate("/")}
      >
        <IoHomeOutline size={24} />
        <span>홈</span>
      </div>
      <div
        css={[s.navItem, pathname === "/crew" && s.activeNavItem]}
        onClick={() => navigate("/crew")}
      >
        <IoPeopleOutline size={24} />
        <span>크루</span>
      </div>
      <div
        css={[s.navItem, pathname === "/feed" && s.activeNavItem]}
        onClick={() => navigate("/feed")}
      >
        <IoImagesOutline size={24} />
        <span>피드</span>
      </div>
      <div
        css={[s.navItem, pathname === "/profile" && s.activeNavItem]}
        onClick={() => navigate("/profile")}
      >
        <IoPersonOutline size={24} />
        <span>프로필</span>
      </div>
    </nav>
  );
}

export default BottomNavBar;
