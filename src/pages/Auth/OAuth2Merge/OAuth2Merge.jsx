/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import OAuth2MergeForm from "./OAuth2MergeForm/OAuth2MergeForm";
import * as s from "./styles";
import { useState } from "react";
import AlertModal from "../../../components/common/AlertModal/AlertModal";

function OAuth2Merge() {
  const navigate = useNavigate();
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
    if (alertModal.status === "success") {
      navigate("/");
      return;
    }
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>Welcome</h1>
      <p css={s.subTitle}>소셜로 간편 로그인 정보 불러오기</p>
      <OAuth2MergeForm openModal={openModal} />
      {alertModal.isOpen && (
        <AlertModal alertModal={alertModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default OAuth2Merge;
