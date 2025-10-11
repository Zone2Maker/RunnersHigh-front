import { useRef } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

//모달의 뼈대가 되는 컴포넌트

const PromptModal = ({ children, onClose }) => {
  // 모달 배경을 참조하기 위한 ref 생성
  const modalBackground = useRef();

  const handleBackdropClick = (e) => {
    // 클릭된 요소가 배경(modalBackground.current) 자체인지 확인
    if (e.target === modalBackground.current) {
      onClose(); // 부모에게 닫기를 요청
    }
  };

  return (
    // 모달 바깥 영역 클릭 시 onClose 함수 호출
    <div css={s.backdrop} ref={modalBackground} onClick={handleBackdropClick}>
      {/* 실제 모달 컨텐츠 영역으로 이벤트 버블링 방지 */}
      <div css={s.modalContent}>
        <button css={s.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PromptModal;
