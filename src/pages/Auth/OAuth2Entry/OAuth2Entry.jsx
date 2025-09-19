/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import * as s from "./styles";
import { joinOAuth2UserReq } from "../../../services/oAuth2/oAuth2Apis";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { useState } from "react";
import { BiSolidMessageSquareError } from "react-icons/bi";

function OAuth2Entry() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isError, setIsError] = useState(false);

  const joinOnClickHandler = async () => {
    setModalContent("");
    setIsError(false);

    // 회원가입 요청 보낼 객체 생성
    const params = {
      email: searchParam.get("email"),
      provider: searchParam.get("provider"),
      providerUserId: searchParam.get("providerUserId"),
    };

    try {
      const resp = await joinOAuth2UserReq(params);
      if (resp.data.status === "success") {
        setModalContent("회원가입 되었습니다. 로그인을 진행해주세요.");
        setIsModalOpen(true);
        return;
      } else if (resp.data.status === "failed") {
        setIsError(true);
        setModalContent(resp.data.message);
        setIsModalOpen(true);
        return;
      }
    } catch (error) {
      setIsError(true);
      setModalContent(error.message || "회원가입 중 문제가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalContent.includes("회원가입 되었습니다.")) {
      window.location.href = "/login";
    }
  };

  return (
    <div css={s.container}>
      <div css={s.titleContainer}>
        <h1 css={s.title}>Welcome</h1>
        <div css={s.subTitle}>소셜 계정 연동 / 회원가입 하기</div>
      </div>
      <div css={s.btnContainer}>
        <Button
          onClick={() => {
            navigate(
              `/auth/oauth2/merge?provider=${searchParam.get(
                "provider"
              )}&providerUserId=${searchParam.get(
                "providerUserId"
              )}&email=${searchParam.get("email")}`
            );
          }}
        >
          <div css={s.subComment}>기존 회원이신가요?</div>
          <div css={s.comment}>계정 연동하기</div>
        </Button>
        <Button onClick={joinOnClickHandler}>
          <div css={s.subComment}>신규 회원이라면</div>
          <div css={s.comment}>소셜 가입하기</div>
        </Button>
      </div>
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

export default OAuth2Entry;
