import { Route, Routes } from "react-router-dom";
import FeedMain from "../../pages/Feed/FeedMain";
import FeedRegister from "../../pages/Feed/FeedRegister/FeedRegister";

function FeedRouter() {
  return (
    <Routes>
      <Route path="" element={<FeedMain />} />
      <Route path="new" element={<FeedRegister />} />
    </Routes>
  );
}

export default FeedRouter;
