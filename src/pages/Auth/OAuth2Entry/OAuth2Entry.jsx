/** @jsxImportSource @emotion/react */
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import * as s from "./styles";
import { joinOAuth2UserReq } from "../../../services/oAuth2/oAuth2Apis";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { useState } from "react";

function OAuth2Entry() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
    status: "",
  });

  const openModal = (message, subMessage, status) => {
    setAlertModal({ isOpen: true, message, subMessage, status });
  };

  const closeModal = () => {
    if (alertModal.message.includes("로그인")) {
      navigate("/login");
      return;
    }
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };

  const joinOnClickHandler = async () => {
    // 회원가입 요청 보낼 객체 생성
    const params = {
      email: searchParam.get("email"),
      provider: searchParam.get("provider"),
      providerUserId: searchParam.get("providerUserId"),
    };

    try {
      const resp = await joinOAuth2UserReq(params);
      if (resp.data.status === "success") {
        openModal(resp.data.message, "로그인을 진행해주세요.", "success");
        return;
      } else if (resp.data.status === "failed") {
        openModal(resp.data.message, "다시 시도해주세요.", "fail");
        return;
      }
    } catch (error) {
      openModal(
        error.message || "회원가입 중 문제가 발생했습니다.",
        "다시 시도해주세요.",
        "fail"
      );
    }
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>Welcome</h1>
      <div css={s.subTitle}>소셜 계정 연동 / 회원가입 하기</div>
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
      {alertModal.isOpen && (
        <AlertModal alertModal={alertModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default OAuth2Entry;
