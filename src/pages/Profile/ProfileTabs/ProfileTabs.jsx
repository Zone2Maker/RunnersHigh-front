/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import { RiCalendarEventLine } from "react-icons/ri";

function ProfileTabs() {
  return (
    <nav css={s.container}>
      {/* 현재 URL과 to의 경로가 일치하면 특정 스타일 적용 */}
      <NavLink to="/profile" end css={({ isActive }) => s.navLink(isActive)}>
        <BsGrid3X3Gap />
      </NavLink>
      <NavLink to="/profile/liked" css={({ isActive }) => s.navLink(isActive)}>
        <FaHeart />
      </NavLink>
      <NavLink to="/profile/diary" css={({ isActive }) => s.navLink(isActive)}>
        <RiCalendarEventLine />
      </NavLink>
    </nav>
  );
}

export default ProfileTabs;
