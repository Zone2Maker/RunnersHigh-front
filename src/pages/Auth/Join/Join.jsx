/** @jsxImportSource @emotion/react */
import { useState } from "react";
import JoinForm from "./JoinForm/JoinForm";
import * as s from "./styles";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import { useNavigate } from "react-router-dom";

function Join() {
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
      navigate("/login");
    }
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };
  return (
    <div css={s.container}>
      <h1 css={s.title}>Join</h1>
      <JoinForm openModal={openModal} />
      {alertModal.isOpen && (
        <AlertModal alertModal={alertModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default Join;
