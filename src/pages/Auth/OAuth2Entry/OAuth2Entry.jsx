/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button/Button";
import * as s from "./styles";
import { joinOAuth2UserReq } from "../../../services/oAuth2/oAuth2Apis";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { useState } from "react";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";

function OAuth2Entry() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const openModal = (message, status) => {
    setModal({ isOpen: true, message, status });
  };

  const closeModal = () => {
    if (modal.message.includes("로그인")) {
      navigate("/login");
      return;
    }
    setModal({ isOpen: false, message: "", status: "" });
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
        openModal("회원가입 되었습니다. 로그인을 진행해주세요.", "success");
        return;
      } else if (resp.data.status === "failed") {
        openModal(resp.data.message, "fail");
        return;
      }
    } catch (error) {
      openModal(error.message || "회원가입 중 문제가 발생했습니다.", "fail");
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
          <span>{modal.message}</span>
        </AlertModal>
      )}
    </div>
  );
}

export default OAuth2Entry;
