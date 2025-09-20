/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Outlet } from "react-router-dom";
import ProfileTabs from "./ProfileTabs/ProfileTabs";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

function Profile() {
  return (
    <div css={s.container}>
      <ProfileHeader />
      <div css={s.profileMain}>
        <ProfileTabs />
        {/* /profile의 자식 라우트들이 들어갈 곳 */}
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
