import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginReq } from "../../../../services/auth/authApis";
import InputBox from "../../../../components/common/InputBox/InputBox";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "../../../../components/common/Button/Button";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // API 호출 시 로딩 상태
  const [isDisabled, setIsDisabled] = useState(false); // 화면이 마운트되었을 때 false

  useEffect(() => {
    setIsDisabled(false);

    // 입력값이 하나라도 없으면 버튼 비활성화
    if (
      email.trim() === null ||
      email.length === 0 ||
      password.trim() === null ||
      password.length === 0
    ) {
      setIsDisabled(true);
    }
  }, [email, password]);

  const loginOnClickHandler = async () => {
    setIsLoading(true); // API 호출 시작 -> 로딩 상태 true

    try {
      const response = await loginReq({ email, password });

      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.data);
        window.location.replace("/");
      }
    } catch (error) {
      alert(error.response.data.message || "로그인 중 문제가 발생했습니다.");
      setEmail("");
      setPassword("");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={s.loginForm}>
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
      <Button
        onClick={loginOnClickHandler}
        isDisabled={isDisabled || isLoading}
      >
        로그인
      </Button>
    </div>
  );
}

export default LoginForm;
