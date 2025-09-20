import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Auth/Login/Login";
import oAuth2Merge from "../../pages/Auth/OAuth2Merge/OAuth2Merge";
import OAuth2Merge from "../../pages/Auth/OAuth2Merge/OAuth2Merge";

function AuthRouter() {
  return (
    <Routes>
      <Route path="join" />
      <Route path="login" element={<Login />} />
      <Route path="/oauth2/entry" />
      <Route path="/oauth2/merge" element={<OAuth2Merge />} />
      <Route path="oauth2/join" />
      <Route path="oauth2/redirect" />
    </Routes>
  );
}

export default AuthRouter;
