import { Route, Routes } from "react-router-dom";
import Layout from "../../components/layout/Layout/Layout";
import AuthRouter from "../AuthRouter/AuthRouter";
import CrewRouter from "../CrewRouter/CrewRouter";
import FeedRouter from "../FeedRouter/FeedRouter";
import Home from "../../pages/Home/Home";

function MainRouter() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/crew/*" element={<CrewRouter />} />
          <Route path="/feed/*" element={<FeedRouter />} />
          <Route path="/profile" />
        </Route>
      </Routes>
    </>
  );
}

export default MainRouter;
