/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import moment from "moment";
import * as s from "./styles";
import { addDiaryReq } from "../../../../services/diary/diaryApis";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

const DiaryWriteModal = ({
  selectedDate,
  onClose,
  newDiaryContent,
  setNewDiaryContent,
  handleSaveDiary,
}) => {
  return (
    <div css={s.modalBody}>
      <div css={s.modalHeader}>{moment(selectedDate).format("YYYY-MM-DD")}</div>
      <h2 css={s.modalTitle}>일지 작성하기</h2>
      <textarea
        css={s.modalTextarea}
        placeholder="일지를 작성해주세요."
        value={newDiaryContent}
        onChange={(e) => setNewDiaryContent(e.target.value)}
      />
      <div css={s.modalActions}>
        <button css={s.saveButton} onClick={handleSaveDiary}>
          저장
        </button>
      </div>
    </div>
  );
};

export default DiaryWriteModal;
