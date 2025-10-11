import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";

function ProtectedRoutes({ children }) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);
  const navigate = useNavigate();

  if (principalData === undefined) {
    return (
      <AlertModal
        alertModal={{
          isOpen: false,
          message: "로그인 후 이용 가능한 서비스입니다.",
          subMessage: "",
          status: "fail",
        }}
        onClose={() => navigate("/login")}
      />
    );
  }

  return children ? children : <Outlet />; //중첩 라우트 지원
}

export default ProtectedRoutes;
