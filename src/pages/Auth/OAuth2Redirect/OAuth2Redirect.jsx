/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import Spinner from "../../../components/common/Spinner/Spinner";
import * as s from "./styles";
import { useEffect } from "react";
import Header from "../../../components/layout/Header/Header";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* 페이지 스크롤 제거 */
  }
`;

function OAuth2Redirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 페이지 로드 시 body 스크롤 제거
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // 페이지 언마운트 시 원래대로 복구
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    console.log("리다이렉트 쿼리 param:", searchParams.toString());
    const accessToken = searchParams.get("token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      alert("인증이 완료되었습니다.");

      //3초 후 메인페이지 이동
      const timer = setTimeout(() => {
        window.location.replace("http://localhost:5173/");
      }, 3000);

      //타이머 리셋
      return () => clearTimeout(timer);
    } else {
      //토큰 없을 때 로그인 페이지로 돌림
      alert("인증에 실패했습니다. 로그인 페이지로 이동합니다.");
      window.location.replace("/auth/login");
    }
  }, [searchParams]);

  return (
    <div css={s.pageContainer}>
      <Header />
      <main css={s.mainContainer}>
        <Spinner />
        <p css={s.messageStyle}>로그인 처리 중입니다...</p>
      </main>
      <BottomNavBar />
    </div>
  );
}

export default OAuth2Redirect;
