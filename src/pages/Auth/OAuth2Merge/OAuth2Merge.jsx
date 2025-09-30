/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import OAuth2MergeForm from "./OAuth2MergeForm/OAuth2MergeForm";
import * as s from "./styles";
import { useState } from "react";
import AlertModal from "../../../components/common/AlertModal/AlertModal";

function OAuth2Merge() {
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
      navigate("/");
      return;
    }
    setModal({ isOpen: false, message: "", status: "" });
  };

  return (
    <div css={s.container}>
      <div css={s.titleContainer}>
        <h1 css={s.title}>Welcome</h1>
        <p>소셜로 간편 로그인 정보 불러오기</p>
      </div>
      <OAuth2MergeForm openModal={openModal} />
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

export default OAuth2Merge;
