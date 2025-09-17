/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import AuthInput from "../../../components/common/AuthInput/AuthInput";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import { loginReq } from "../../../services/auth/AuthApis";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 입력값 유효성 검사
  const loginOnClickHandler = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (email.trim().length === 0 || password.trim().length === 0) {
      alert("이메일 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      // 로그인 API 요청 보내기
      loginReq({
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            alert(response.data.message);

            // accessToken 가져오기
            const accessToken = response.data.data;
            localStorage.setItem("accessToken", accessToken);
            window.location.href = "/";
          } else if (response.data.status === "failed") {
            alert(response.data.message);
            return;
          }
        })
        .catch((error) => {
          alert("문제가 발생했습니다.");
          return;
        });
    }
  };

  return (
    <div css={s.pageContainer}>
      <main css={s.formContainer}>
        <h1 css={s.title}>Log in</h1>
        <form>
          <AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" css={s.loginButton} onClick={loginOnClickHandler}>로그인</button>
        </form>

        <div css={s.linksContainer}>
          <a href="#signup">회원가입</a>
          <span>|</span>
          <a href="#find-password">비밀번호 찾기</a>
        </div>
        
        <section css={s.socialSection}>
          <button css={[s.socialButton, s.google]}>G</button>
          <button css={[s.socialButton, s.kakao]}> </button>
          <button css={[s.socialButton, s.naver]}>N</button>
        </section>
      </main>
      
      {/* 화면 전체에 고정되는 컴포넌트들 */}
      {/* <FloatingChatButton /> */}
      <BottomNavBar />
    </div>
  );
}



export default Login;