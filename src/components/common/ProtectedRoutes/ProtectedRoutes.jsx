import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";
import { LuMessageSquareWarning } from "react-icons/lu";

function ProtectedRoutes({ children }) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);
  const navigate = useNavigate();

  if (principalData === undefined) {
    return (
      <AlertModal onClose={() => navigate("/auth/login")}>
        <LuMessageSquareWarning size={"60px"} style={{ color: "#ff4d4d" }} />
        <strong>로그인 후 이용 가능한 서비스입니다.</strong>
      </AlertModal>
    );
  }

  return children ? children : <Outlet />; //중첩 라우트 지원
}

export default ProtectedRoutes;
