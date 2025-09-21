import { Route, Routes } from "react-router-dom";
import OAuth2Entry from "../../pages/Auth/OAuth2Entry/OAuth2Entry";
import OAuth2Merge from "../../pages/Auth/OAuth2Merge/OAuth2Merge";
import OAuth2Redirect from "../../pages/Auth/OAuth2Redirect/OAuth2Redirect";

function AuthRouter() {
  return (
    <Routes>
      <Route path="oauth2/entry" element={<OAuth2Entry />} />
      <Route path="oauth2/merge" element={<OAuth2Merge />} />
      <Route path="oauth2/join" />
      <Route path="oauth2/redirect" element={<OAuth2Redirect />} />
    </Routes>
  );
}

export default AuthRouter;
