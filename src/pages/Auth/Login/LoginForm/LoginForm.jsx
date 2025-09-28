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
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);

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
    setIsLoading(true);

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
          id="email"
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
