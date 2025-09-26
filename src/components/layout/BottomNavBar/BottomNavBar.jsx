/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoImagesOutline,
  IoLogInOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavBar() {
  const navigate = useNavigate(); //페이지 이동
  const { pathname } = useLocation(); //현재 URL 경로 정보
  const { principal, logout } = usePrincipalState();

  return (
    <nav css={s.navContainer}>
      {/* 현재 경로(pathname)에 따라 active 스타일을 적용 */}
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
      {principal ? (
        pathname.includes("/profile") ? (
          pathname.includes("/profile") && (
            <div css={s.navItem} onClick={logout}>
              <IoLogOutOutline size={24} />
              <span>로그아웃</span>
            </div>
          )
        ) : (
          <div
            css={[s.navItem, pathname === "/profile" && s.activeNavItem]}
            onClick={() => navigate("/profile")}
          >
            <div css={s.profileBox}>
              <img src={principal.profileImgUrl} css={s.profileImg} />
              <div>프로필</div>
            </div>
          </div>
        )
      ) : (
        <div
          css={[s.navItem, pathname === "/login" && s.activeNavItem]}
          onClick={() => navigate("/login")}
        >
          <IoLogInOutline size={24} />
          <span>로그인</span>
        </div>
      )}
    </nav>
  );
}

export default BottomNavBar;
