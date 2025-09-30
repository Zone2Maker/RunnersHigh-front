/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Outlet } from "react-router-dom";
import ProfileTabs from "./ProfileTabs/ProfileTabs";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

function Profile() {
  return (
    <div css={s.container}>
      {/* 둘 다 붙어있어야 하니까 - 무한 스크롤 되면 안됨 */}
      <div css={s.stickyContainer}>
        <ProfileHeader />
        <div css={s.navBar}>
          <ProfileTabs />
        </div>
      </div>

      <div css={s.profileMain}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
