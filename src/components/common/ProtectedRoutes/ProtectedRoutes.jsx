import { useQueryClient } from '@tanstack/react-query';

function ProtectedRoutes({ children }) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData([""]); //useQuery키값

  if (principalData === undefined) {
    //return 모달(로그인이 필요한 서비스입니다.)
    //버튼클릭? window.location.href = "/auth/login";
  }

  return children ? children : <Outlet />; //중첩 라우트 지원
}

export default ProtectedRoutes