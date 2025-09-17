/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import * as s from "./styles";

function AlertModal({ children, onClose }) {
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
        {children}
      </div>
    </div>
  );
}

export default AlertModal;
