/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import InputBox from "../../../../components/common/InputBox/InputBox";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
import Button from "../../../../components/common/Button/Button";
import { useCheckDuplicate } from "../../../../hooks/useCheckDuplicate";
import { useNavigate } from "react-router-dom";
import { joinReq } from "../../../../services/auth/AuthApis";
import { checkUserExistReq } from "../../../../services/user/userApis";
import AlertModal from "../../../../components/common/AlertModal/AlertModal";

function JoinForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // 에러 메시지 조건 설정
  // 이메일, 비밀번호 형식 체크
  useEffect(() => {
    setIsDisabled(false);
    setErrorMessage({});

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    if (!emailRegex.test(email) && email.length > 0) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "올바르지 않은 이메일 형식입니다.",
      }));
      setIsDisabled(true);
    }

    if (!pwRegex.test(password) && password.length > 0) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "비밀번호는 영문/숫자/특수기호 조합 8자리 이상이어야 합니다.",
      }));
      setIsDisabled(true);
    }
  }, [email, password]);

  // 회원가입 버튼 클릭 시
  const joinOnClickHandler = () => {
    // 1. 입력값 유효성 검사
    if (errorMessage.email || errorMessage.password || !email || !password) {
      alert("이메일과 비밀번호를 올바르게 입력해주세요.");
      return;
    }

    // 2. 이메일 중복 검사
    checkUserExistReq(email, null)
      .then((resp) => {
        // 중복 이메일이 아니라면
        if (resp.data.status === "success") {
          // 회원가입 진행
          joinReq({
            email: email,
            password: password,
          })
            .then((response) => {
              console.log(response.data);
              if (response.data.status === "success") {
                alert(response.data.message);
                navigate("/auth/login");
              } else if (response.data.status === "failed") {
                alert(response.data.message);
                //요청은 성공 but 아이디/이메일 중복 확인에 걸렸을 때
              }
            })
            .catch((error) => {
              //요청 에러가 아닌 서버 에러
              alert("문제가 발생했습니다. 다시 시도해주세요.");
              return;
            });
        } else if (resp.data.status === "failed") {
          alert("이미 사용중인 이메일입니다.");
          return;
          //   <AlertModal>
          //     <div>사용중인 이메일</div>
          //   </AlertModal>;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        return;
      });
  };

  return (
    <div css={s.joinForm}>
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
      {errorMessage.email ? <p css={s.error}>{errorMessage.email}</p> : <></>}
      {errorMessage.password ? (
        <p css={s.error}>{errorMessage.password}</p>
      ) : (
        <></>
      )}
      <Button onClick={joinOnClickHandler} isDisabled={isDisabled}>
        회원가입
      </Button>
    </div>
  );
}

export default JoinForm;
