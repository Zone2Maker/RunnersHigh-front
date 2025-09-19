import { Route, Routes } from "react-router-dom";
import CrewMain from "../../pages/Crew/CrewMain/CrewMain";

function CrewRouter() {
  return (
    <Routes>
      <Route path="" element={<CrewMain />} />
      <Route path="/new" />
    </Routes>
  );
}

export default CrewRouter;
