import { Route, Routes } from "react-router-dom";
import OAuth2Entry from "../../pages/Auth/OAuth2Entry/OAuth2Entry";

function AuthRouter() {
  return (
    <Routes>
      <Route path="oauth2/entry" element={<OAuth2Entry />} />
      <Route path="oauth2/merge" />
      <Route path="oauth2/join" />
      <Route path="oauth2/redirect" />
    </Routes>
  );
}

export default AuthRouter;
