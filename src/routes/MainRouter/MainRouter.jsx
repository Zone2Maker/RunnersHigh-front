import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout";
import AuthRouter from "../AuthRouter/AuthRouter";
import CrewRouter from "../CrewRouter/CrewRouter";
import FeedRouter from "../FeedRouter/FeedRouter";
import Home from "../../pages/Home/Home";
import ProfileRouter from "../ProfileRouter/ProfileRouter";
import Join from "../../pages/Auth/Join/Join";
import Login from "../../pages/Auth/Login/Login";

function MainRouter() {
  return (
    <>
      <Routes>
        {/* 최상위 라우트들, path에 "/"로 시작 */}
        <Route element={<Layout />}>
          {/* index 사용시 기본 경로와 같다 */}
          <Route index element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/crew/*" element={<CrewRouter />} />
          <Route path="/feed/*" element={<FeedRouter />} />
          <Route path="/profile/*" element={<ProfileRouter />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRouter;
