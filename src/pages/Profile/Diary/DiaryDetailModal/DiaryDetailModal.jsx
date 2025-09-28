/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import moment from "moment";
import { GiFootprint } from "react-icons/gi";

const DiaryDetailModal = ({ selectedDate, diaryDetail }) => {
  return (
    <div css={s.container}>
      <div css={s.date}>{moment(selectedDate).format("YYYY-MM-DD")}</div>
      <div css={s.title}>
        <span>나의 러닝 기록</span>
        <GiFootprint />
      </div>

      <div css={s.content}>
        <p>{diaryDetail?.diaryContent || "작성된 일지가 없습니다."}</p>
      </div>
    </div>
  );
};

export default DiaryDetailModal;
