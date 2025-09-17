/** @jsxImportSource @emotion/react */
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm/LoginForm";
import * as s from "./styles";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import Header from "../../../components/layout/Header/Header";
import ChatButton from "../../../components/layout/ChatButton/ChatButton";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [unReadCnt, setUnReadCnt] = useState(0);
  const openChat = () => console.log("채팅방 열림");
  return (
    <div css={s.pageContainer}>
      <main css={s.formContainer}>
        <h1 css={s.title}>Log in</h1>

        <LoginForm />

        <div css={s.linksContainer}>
          <Link to="/auth/join">회원가입</Link>
          <span>|</span>
          <a href="">비밀번호 찾기</a>
        </div>

        <section css={s.socialSection}>
          <a
            href="http://localhost:8080/oauth2/authorization/google"
            css={[s.socialButton, s.google]}
          >
            <FcGoogle size={25} css={s.google} />
          </a>
          <a
            href="http://localhost:8080/oauth2/authorization/kakao"
            css={[s.socialButton, s.kakao]}
          >
            <RiKakaoTalkFill size={25} css={s.kakao} />
          </a>
          <a
            href="http://localhost:8080/oauth2/authorization/naver"
            css={[s.socialButton, s.naver]}
          >
            <SiNaver size={25} css={s.naver} />
          </a>
        </section>
      </main>
      <ChatButton unReadCnt={unReadCnt} openChat={openChat} />
    </div>
  );
}

export default Login;
