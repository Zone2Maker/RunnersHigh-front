/** @jsxImportSource @emotion/react */
import { useState } from "react";
import JoinForm from "./JoinForm/JoinForm";
import * as s from "./styles";
import AlertModal from "../../../components/common/AlertModal/AlertModal";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    status: "",
  });

  const openModal = (message, status) => {
    setModal({ isOpen: true, message, status });
  };

  const closeModal = () => {
    if (modal.status === "success") {
      navigate("/login");
    }
    setModal({ isOpen: false, message: "", status: "" });
  };
  return (
    <div css={s.container}>
      <h1 css={s.title}>Join</h1>
      <JoinForm openModal={openModal} />
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

export default Join;
