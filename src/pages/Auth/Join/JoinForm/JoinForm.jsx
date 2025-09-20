/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import InputBox from "../../../../components/common/InputBox/InputBox";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
import Button from "../../../../components/common/Button/Button";
import { useCheckDuplicate } from "../../../../hooks/useCheckDuplicate";
import { useNavigate } from "react-router-dom";
import { joinReq } from "../../../../services/auth/AuthApis";
import AlertModal from "../../../../components/common/AlertModal/AlertModal";
import { BiSolidMessageSquareError } from "react-icons/bi";

function JoinForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const {
    isLoading: isChecking,
    isAvailable: isEmailAvailable,
    message: apiMessage,
    checkExist,
    reset,
  } = useCheckDuplicate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  // 에러 메시지 조건 설정
  // 이메일, 비밀번호 형식 체크
  useEffect(() => {
    const newErrors = {};

    if (email.length > 0) {
      if (!emailRegex.test(email)) {
        newErrors.email = "이메일 형식에 맞게 입력해주세요.";
      }
    }

    if (password.length > 0) {
      if (!pwRegex.test(password)) {
        newErrors.password =
          "비밀번호는 영문/숫자/특수기호 조합 8자리 이상이어야 합니다.";
      }
    }

    setErrorMessage(newErrors);
  }, [email, password]);

  const emailOnBlurHandler = async (e) => {
    const email = e.target.value;

    // 이메일이 비어있지 않고, 형식에 맞을 때 검사
    if (email && emailRegex.test(email)) {
      checkExist("email", email);
    } else {
      reset();
    }
  };

  // 회원가입 버튼 클릭 시
  const joinOnClickHandler = async () => {
    setModalContent("");
    setIsError(false);

    // 입력값 유효성 검사
    if (errorMessage.email || errorMessage.password || !email || !password) {
      setModalContent("이메일과 비밀번호를 올바르게 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

    if (isEmailAvailable !== true) {
      setModalContent("이미 사용중인 이메일입니다.");
      setIsModalOpen(true);
      return;
    }

    try {
      const joinResp = await joinReq({ email: email, password: password });

      if (joinResp.data.status === "success") {
        setModalContent("회원가입 되었습니다. 로그인을 진행해주세요.");
        setIsModalOpen(true);
        setEmail("");
        setPassword("");
      } else if (joinResp.data.status === "failed") {
        setIsError(true);
        setModalContent(joinResp.data.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsError(true);
      setModalContent(error.message || "오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalContent.includes("회원가입 되었습니다.")) {
      navigate("/login");
    }
  };

  // 버튼 비활성화 조건
  const isDisabled =
    isChecking ||
    email.length === 0 ||
    password.length === 0 ||
    Object.keys(errorMessage).length > 0 ||
    isEmailAvailable === false;

  return (
    <div css={s.joinForm}>
      <div css={s.inputGroup}>
        <InputBox>
          <AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={emailOnBlurHandler}
          />
          <AuthInput
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
      </div>
      <div css={s.messageBox}>
        {/* 정규식 에러 메시지 */}
        {errorMessage.email && <p css={s.error}>{errorMessage.email}</p>}
        {errorMessage.password && !errorMessage.email && (
          <p css={s.error}>{errorMessage.password}</p>
        )}
        {/* 정규식 에러 없을 때만 중복 체크 */}
        {!errorMessage.email && !errorMessage.password && apiMessage && (
          <p css={isEmailAvailable ? s.check : s.error}>{apiMessage}</p>
        )}
      </div>
      <Button onClick={joinOnClickHandler} isDisabled={isDisabled}>
        회원가입
      </Button>
      {isModalOpen && (
        <AlertModal onClose={closeModal}>
          <div css={s.alertContent}>
            {isError ? (
              <BiSolidMessageSquareError
                size={60}
                style={{ color: "#ff4d4d" }}
              />
            ) : (
              <BiSolidMessageSquareError
                size={60}
                style={{ color: "#2bd65e" }}
              />
            )}

            <span>{modalContent}</span>
          </div>
        </AlertModal>
      )}
    </div>
  );
}

export default JoinForm;
