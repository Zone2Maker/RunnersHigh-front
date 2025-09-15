//회원가입 
import React, { useState } from "react";
import Modal from "../../../Modal/Modal";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

const Modalexample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '50px' }}>
      <h1>Join</h1>
      <button onClick={handleOpenModal}>모달 열기</button>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>안녕하세요!</h2>
          <p>공통 모달 컴포넌트 확인용</p>
          <button onClick={handleCloseModal}>확인</button>
        </Modal>
      )}
    </div>
  );
};

export default Modalexample;