import { Route, Routes } from "react-router-dom";
import FeedMain from "../../pages/Feed/FeedMain";

function FeedRouter() {
  return (
    <Routes>
      <Route path="" element={<FeedMain />} />
      <Route path="new" />
    </Routes>
  );
}

export default FeedRouter;
