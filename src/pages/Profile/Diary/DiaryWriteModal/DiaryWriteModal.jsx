/** @jsxImportSource @emotion/react */
import moment from "moment";
import * as s from "./styles";
import { LuNotebookPen } from "react-icons/lu";
import { useState } from "react";
import { addDiaryReq } from "../../../../services/diary/diaryApis";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

function DiaryWriteModal({ selectedDate, onSaveSuccess, openModal }) {
  const { principal } = usePrincipalState();
  const [diaryContent, setDiaryContent] = useState();

  const saveBtnOnClickHandler = async () => {
    if (!diaryContent.trim()) {
      openModal("일지를 작성해주세요.", "", "fail");
      return;
    }

    const data = {
      userId: principal.userId,
      diaryContent: diaryContent,
      diaryDate: selectedDate,
    };

    addDiaryReq(data)
      .then((resp) => {
        if (resp.data.status === "success") {
          onSaveSuccess(selectedDate, resp.data.message);
        } else {
          openModal(resp.data.message, "다시 시도해주세요.", "fail");
          return;
        }
      })
      .catch((error) => {
        openModal("서버에 오류가 발생했습니다.", "다시 시도해주세요.", "fail");
      });
  };

  return (
    <div css={s.container}>
      <div css={s.date}>{moment(selectedDate).format("YYYY-MM-DD")}</div>
      <div css={s.title}>
        <span>일지 작성하기</span>
        <LuNotebookPen />
      </div>
      <div css={s.text}>
        <textarea
          css={s.textarea}
          placeholder="일지를 작성해주세요."
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
        />
      </div>
      <div css={s.saveBtn}>
        <button onClick={saveBtnOnClickHandler}>저장</button>
      </div>
    </div>
  );
}

export default DiaryWriteModal;
