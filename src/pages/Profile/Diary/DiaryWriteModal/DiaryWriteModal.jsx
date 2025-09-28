/** @jsxImportSource @emotion/react */
import moment from "moment";
import * as s from "./styles";
import { LuNotebookPen } from "react-icons/lu";

const DiaryWriteModal = ({
  selectedDate,
  onClose,
  newDiaryContent,
  setNewDiaryContent,
  saveDiaryHandler,
}) => {
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
          value={newDiaryContent}
          onChange={(e) => setNewDiaryContent(e.target.value)}
        />
      </div>
      <div css={s.saveBtn}>
        <button onClick={saveDiaryHandler}>저장</button>
      </div>
    </div>
  );
};

export default DiaryWriteModal;
