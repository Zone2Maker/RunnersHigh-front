/** @jsxImportSource @emotion/react */
import { FcGoogle } from "react-icons/fc";
import LoginForm from "./LoginForm/LoginForm";
import * as s from "./styles";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";

function Login() {
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const openModal = (message, status) => {
    setModal({ isOpen: true, message, status });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "", status: "" });
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>Log in</h1>

      <LoginForm openModal={openModal} />

      <div css={s.joinButton}>
        <Link to="/join">회원가입</Link>
      </div>

      <div css={s.socialSection}>
        <a
          href={`${
            import.meta.env.VITE_API_BASE_URL
          }/oauth2/authorization/google`}
          css={[s.socialButton, s.google]}
        >
          <FcGoogle css={s.google} />
        </a>
        <a
          href={`${
            import.meta.env.VITE_API_BASE_URL
          }/oauth2/authorization/kakao`}
          css={[s.socialButton, s.kakao]}
        >
          <RiKakaoTalkFill css={s.kakao} />
        </a>
        <a
          href={`${
            import.meta.env.VITE_API_BASE_URL
          }/oauth2/authorization/naver`}
          css={[s.socialButton, s.naver]}
        >
          <SiNaver css={s.naver} />
        </a>
      </div>
      {modal.isOpen && (
        <AlertModal onClose={closeModal}>
          {modal.status === "success" ? (
            <BiSolidMessageSquareCheck
              size={"60px"}
              style={{ color: "#00296b" }}
            />
          ) : (
            <BiSolidMessageSquareError
              size={"60px"}
              style={{ color: "#f57c00" }}
            />
          )}
          <strong>{modal.message}</strong>
        </AlertModal>
      )}
    </div>
  );
}

export default Login;
