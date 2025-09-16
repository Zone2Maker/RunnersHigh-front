function AuthRouter() {
  return (
    <Routes>
      <Route path="/join" />
      <Route path="/login" />
      <Route path="/oauth2/entry" />
      <Route path="/oauth2/merge" />
      <Route path="/oauth2/join" />
      <Route path="/oauth2/redirect" />
    </Routes>
  );
}

export default AuthRouter;
