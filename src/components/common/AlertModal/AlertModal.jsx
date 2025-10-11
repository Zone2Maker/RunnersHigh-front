/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import * as s from "./styles";
import { BiSolidMessageSquareCheck, BiSolidMessageSquareError } from "react-icons/bi";

function AlertModal({ alertModal, onClose }) {
  const modalBackground = useRef();

  const handleBackdropClick = (e) => {
    // 클릭된 요소가 배경(modalBackground.current) 자체인지 확인
    if (e.target === modalBackground.current) {
      onClose(); // 부모에게 닫기를 요청
    }
  };

  return (
    <div css={s.backdrop} ref={modalBackground} onClick={handleBackdropClick}>
      <div css={s.modalContent}>
        <button css={s.closeButton} onClick={onClose}>
          &times;
        </button>
        {alertModal.status === "success" ? (
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
        <strong>{alertModal.message}</strong>
        {alertModal.subMessage !== "" && <p>{alertModal.subMessage}</p>}
      </div>
    </div>
  );
}

export default AlertModal;
