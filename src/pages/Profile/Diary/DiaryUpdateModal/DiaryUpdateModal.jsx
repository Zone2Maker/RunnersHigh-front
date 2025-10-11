import { useEffect, useState } from "react";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import {
  getDiaryDetailByDateReq,
  updateDiaryReq,
} from "../../../../services/diary/diaryApis";
/** @jsxImportSource @emotion/react */
import moment from "moment";
import * as s from "./styles";
import { LuNotebookPen } from "react-icons/lu";

function DiaryUpdateModal({
  selectedDate,
  setPromptModal,
  onUpdateSuccess,
  openModal,
}) {
  const { principal } = usePrincipalState();
  const [diaryDetail, setDiaryDetail] = useState({});
  const [newDiaryContent, setNewDiaryContent] = useState();

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const resp = await getDiaryDetailByDateReq(selectedDate);

        if (resp.data.status === "success") {
          setDiaryDetail(resp.data.data);
          setNewDiaryContent(resp.data.data.diaryContent);
        }
      } catch (error) {
        openModal("일지 조회에 실패했습니다.", " 다시 시도해주세요.", "fail");
      }
    };

    fetchDiaryDetail();
  }, []);

  const updateBtnOnClickHandler = async () => {
    if (!newDiaryContent.trim()) {
      openModal("일지를 작성해주세요.", "", "fail");
      return;
    }

    const data = {
      diaryId: diaryDetail.diaryId,
      userId: principal.userId,
      diaryContent: newDiaryContent,
    };

    updateDiaryReq(data)
      .then((resp) => {
        if (resp.data.status === "success") {
          onUpdateSuccess(selectedDate, resp.data.message);
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
        <span>일지 수정하기</span>
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
      <div css={s.btnContainer}>
        <button
          css={[s.btn, s.cancelBtn]}
          onClick={() => {
            setPromptModal((prev) => ({
              ...prev,
              type: "detail",
            }));
          }}
        >
          취소
        </button>
        <button css={[s.btn, s.updateBtn]} onClick={updateBtnOnClickHandler}>
          저장
        </button>
      </div>
    </div>
  );
}

export default DiaryUpdateModal;
