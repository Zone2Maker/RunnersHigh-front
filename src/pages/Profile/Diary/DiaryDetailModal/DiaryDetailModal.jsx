/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { GiFootprint } from "react-icons/gi";
import { getDiaryDetailByDateReq } from "../../../../services/diary/diaryApis";

const DiaryDetailModal = ({ selectedDate, setPromptModal, openModal }) => {
  const [diaryContent, setDiaryContent] = useState("");

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const resp = await getDiaryDetailByDateReq(selectedDate);

        if (resp.data.status === "success") {
          setDiaryContent(resp.data.data.diaryContent);
        }
      } catch (error) {
        openModal("일지 조회에 실패했습니다.", " 다시 시도해주세요.", "fail");
      }
    };

    fetchDiaryDetail();
  }, []);

  return (
    <div css={s.container}>
      <div css={s.date}>{moment(selectedDate).format("YYYY-MM-DD")}</div>
      <div css={s.title}>
        <span>나의 러닝 기록</span>
        <GiFootprint />
      </div>

      <div css={s.content}>
        <p>{diaryContent}</p>
      </div>
      <div css={s.modifyBtn}>
        <button
          onClick={() => {
            setPromptModal({
              isOpen: true,
              date: selectedDate,
              type: "modify",
            });
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default DiaryDetailModal;
