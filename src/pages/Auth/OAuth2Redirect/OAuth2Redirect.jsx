/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import Spinner from "../../../components/common/Spinner/Spinner";
import * as s from "./styles";
import { useEffect } from "react";

function OAuth2Redirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      alert("로그인되었습니다.");
      window.location.replace("/");
    } else {
      //토큰 없을 때 로그인 페이지로 돌림
      alert("인증에 실패했습니다. 로그인 페이지로 이동합니다.");
      window.location.replace("/login");
    }
  }, [searchParams]);

  return (
    <main css={s.mainContainer}>
      <Spinner />
      <p css={s.messageStyle}>로그인 처리 중입니다...</p>
    </main>
  );
}

export default OAuth2Redirect;
