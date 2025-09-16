//공통 컴포넌트 - 모달
//모달의 뼈대가 되는 컴포넌트

import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

//children 부분에 <MyChatting/>
const Modal = ({ children, onClose }) => {
  return (
    // 모달 바깥 영역 클릭 시 onClose 함수 호출
    <div css={s.backdrop} onClick={onClose}>
      {/* 실제 모달 컨텐츠 영역으로 이벤트 버블링 방지 */}
      <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button css={s.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;


