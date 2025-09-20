import { Route, Routes } from "react-router-dom";
import CrewMain from "../../pages/Crew/CrewMain/CrewMain";
import CrewRegister from "../../pages/Crew/CrewRegister/CrewRegister";

function CrewRouter() {
  return (
    <Routes>
      <Route path="" element={<CrewMain />} />
      <Route path="new" element={<CrewRegister />} />
    </Routes>
  );
}

export default CrewRouter;
