import { useState } from "react";
import { loginReq } from "../../../../services/auth/authApis";
import InputBox from "../../../../components/common/InputBox/InputBox";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "../../../../components/common/Button/Button";

function LoginForm({ openModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginOnClickHandler = async () => {
    if (
      email.length === "0" ||
      email.trim() === "" ||
      password.length === "0" ||
      password.trim() === ""
    ) {
      openModal("모든 항목을 입력해주세요.", "fail");
    }

    setIsLoading(true);
    try {
      const response = await loginReq({ email, password });

      if (response.data.status === "success") {
        localStorage.setItem("accessToken", response.data.data);
        window.location.replace("/");
      } else if (response.data.status === "failed") {
        openModal(response.data.message, "fail");
      }
    } catch (error) {
      openModal(
        error.response.data.message || "로그인 중 문제가 발생했습니다.",
        "fail"
      );
      setEmail("");
      setPassword("");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      css={s.loginForm}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          loginOnClickHandler();
        }
      }}
    >
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
      <Button onClick={loginOnClickHandler}>로그인</Button>
    </div>
  );
}

export default LoginForm;
