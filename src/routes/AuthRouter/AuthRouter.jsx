import { Route, Routes } from "react-router-dom";

function AuthRouter() {
  return (
    <Routes>
      <Route path="join" />
      <Route path="login" element={<Login />} />
      <Route path="/oauth2/entry" />
      <Route path="oauth2/merge" element={<OAuth2Merge />} />
      <Route path="oauth2/join" />
      <Route path="oauth2/redirect" />
    </Routes>
  );
}

export default AuthRouter;
