import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginReq } from "../../../../services/auth/AuthApis";
import InputBox from "../../../../components/common/InputBox/InputBox";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "../../../../components/common/Button/Button";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // API 호출 시 로딩 상태

  //이메일 형식 검사
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isEmailValid = emailRegex.test(email);

  //입력값 채워짐 / 이메일 형식이 맞을 때만 버튼 활성화
  const isButtonDisabled = !email || !password || !isEmailValid;

  const loginOnClickHandler = async (e) => { 
    e.preventDefault();

    if (isButtonDisabled) return; 
    setIsLoading(true); // API 호출 시작 -> 로딩 상태 true

    try {
      const response = await loginReq({ email, password });

      if (response.status === "success") {
        localStorage.setItem("accessToken", response.data.data);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message || "로그인 중 문제가 발생했습니다.");
      setEmail('');
      setPassword('');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={loginOnClickHandler}>
      <InputBox>
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
      </InputBox>
      <Button type="submit" css={s.loginButton} disabled={isButtonDisabled || isLoading}>
        로그인
      </Button>
    </form>
  );
}

export default LoginForm;