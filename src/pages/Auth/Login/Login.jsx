/** @jsxImportSource @emotion/react */
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm/LoginForm";
import * as s from "./styles";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div css={s.container}>
      <h1 css={s.title}>Log in</h1>

      <LoginForm />

      <div css={s.joinButton}>
        <Link to="/auth/join">회원가입</Link>
      </div>

      <div css={s.socialSection}>
        <a
          href="http://localhost:8080/oauth2/authorization/google"
          css={[s.socialButton, s.google]}
        >
          <FcGoogle css={s.google} />
        </a>
        <a
          href="http://localhost:8080/oauth2/authorization/kakao"
          css={[s.socialButton, s.kakao]}
        >
          <RiKakaoTalkFill css={s.kakao} />
        </a>
        <a
          href="http://localhost:8080/oauth2/authorization/naver"
          css={[s.socialButton, s.naver]}
        >
          <SiNaver css={s.naver} />
        </a>
      </div>
    </div>
  );
}

export default Login;
