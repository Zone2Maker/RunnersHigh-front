import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
import Join from "../../pages/Auth/Join/Join";

function AuthRouter() {
  return (
    <Routes>
      <Route path="join" element={<Join />} />
      <Route path="login" element={<Login />} />
      <Route path="oauth2/entry" />
      <Route path="oauth2/merge" />
      <Route path="oauth2/join" />
      <Route path="oauth2/redirect" />
    </Routes>
  );
}

export default AuthRouter;
