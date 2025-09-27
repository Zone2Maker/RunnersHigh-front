/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import moment from "moment";

const DiaryDetailModal = ({ selectedDate, diaryDetail }) => {
  return (
    <div css={s.modalBody}>
      <div css={s.modalHeader}>{moment(selectedDate).format("YYYY-MM-DD")}</div>
      <h2 css={s.modalTitle}>오늘의 일지</h2>
      <p css={s.modalText}>
        {diaryDetail?.diaryContent || "작성된 일지가 없습니다."}
      </p>
    </div>
  );
};

export default DiaryDetailModal;
