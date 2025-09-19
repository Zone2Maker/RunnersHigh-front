import { Route, Routes } from "react-router-dom";
import Profile from "../../pages/Profile/Profile";
import MyFeed from "../../pages/Profile/MyFeed/MyFeed";
import LikedFeed from "../../pages/Profile/LikedFeed/LikedFeed";
import Diary from "../../pages/Profile/Diary/Diary";

function ProfileRouter() {
  return (
    <Routes>
      {/* 부모 라우트: /profile 접속 시 Profile 컴포넌트를 껍데기로 사용 */}
      <Route element={<Profile />}>
        {/* 자식 라우트 1: index는 부모 라우트와 경로가 같을 때 해당 컴포넌트를 기본으로 보여준다. */}
        <Route index element={<MyFeed />} />
        {/* 자식 라우트 2: /profile/liked */}
        {/* 자식 라우트는 path에 "/" 붙이지 않음! */}
        <Route path="liked" element={<LikedFeed />} />
        {/* 자식 라우트 3: /profile/diary */}
        <Route path="diary" element={<Diary />} />
      </Route>
    </Routes>
  );
}

export default ProfileRouter;
