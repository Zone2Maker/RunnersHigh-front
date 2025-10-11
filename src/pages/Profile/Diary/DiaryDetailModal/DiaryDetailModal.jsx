/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { GiFootprint } from "react-icons/gi";
import {
  deleteDiaryReq,
  getDiaryDetailByDateReq,
} from "../../../../services/diary/diaryApis";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

const DiaryDetailModal = ({
  selectedDate,
  onDeleteSuccess,
  setPromptModal,
  openModal,
}) => {
  const { principal } = usePrincipalState();
  const [diaryDetail, setDiaryDetail] = useState({});

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const resp = await getDiaryDetailByDateReq(selectedDate);

        if (resp.data.status === "success") {
          setDiaryDetail(resp.data.data);
        }
      } catch (error) {
        openModal("일지 조회에 실패했습니다.", " 다시 시도해주세요.", "fail");
      }
    };

    fetchDiaryDetail();
  }, []);

  const deleteBtnOnClickHandler = async () => {
    const data = {
      diaryId: diaryDetail.diaryId,
      userId: principal.userId,
    };

    deleteDiaryReq(data)
      .then((resp) => {
        if (resp.data.status === "success") {
          onDeleteSuccess(selectedDate, resp.data.message);
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
        <span>나의 러닝 기록</span>
        <GiFootprint />
      </div>

      <div css={s.content}>
        <p>{diaryDetail.diaryContent}</p>
      </div>
      <div css={s.btnContainer}>
        <button css={[s.btn, s.deleteBtn]} onClick={deleteBtnOnClickHandler}>
          삭제
        </button>
        <button
          css={[s.btn, s.modifyBtn]}
          onClick={() => {
            setPromptModal({
              isOpen: true,
              date: selectedDate,
              type: "modify",
            });
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default DiaryDetailModal;
