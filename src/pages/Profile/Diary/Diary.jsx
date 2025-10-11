/** @jsxImportSource @emotion/react */
import Calendar from "react-calendar";
import * as s from "./styles";
import moment from "moment";
import "./Calendar.css";
import { useEffect, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { getActiveListByDateReq } from "../../../services/diary/diaryApis";
import PromptModal from "../../../components/common/PromptModal/PromptModal.jsx";
import AlertModal from "../../../components/common/AlertModal/AlertModal.jsx";
import DiaryDetailModal from "./DiaryDetailModal/DiaryDetailModal.jsx";
import DiaryWriteModal from "./DiaryWriteModal/DiaryWriteModal.jsx";
import DiaryUpdateModal from "./DiaryUpdateModal/DiaryUpdateModal.jsx";

function Diary() {
  const { principal } = usePrincipalState();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const [markedDates, setMarkedDates] = useState([]);

  const [promptModal, setPromptModal] = useState({
    isOpen: false,
    date: "",
    type: "",
  });

  const [alertmodal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    subMessage: "",
    status: "",
  });

  const openModal = (message, subMessage, status) => {
    setAlertModal({ isOpen: true, message, subMessage, status });
  };

  const closeModal = () => {
    setAlertModal({ isOpen: false, message: "", subMessage: "", status: "" });
  };

  useEffect(() => {
    const fetchMarkedDates = async () => {
      if (!principal) {
        return;
      }

      try {
        const response = await getActiveListByDateReq(
          currentYear,
          currentMonth
        );
        const dates = response.data?.data || [];

        // 비교/렌더링용 날짜 저장 (YYYY-MM-DD)
        const formattedDates = dates.map((d) => moment(d).format("YYYY-MM-DD"));
        setMarkedDates(formattedDates);
      } catch (error) {
        openModal("기록 조회에 실패했습니다.", "다시 시도해주세요.", "fail");
        setMarkedDates([]);
      }
    };

    fetchMarkedDates();
  }, [currentYear, currentMonth, principal]);

  const dateOnClickHandler = async (clickedDate) => {
    const formattedDate = moment(clickedDate).format("YYYY-MM-DD");

    const hasDiary = markedDates.includes(formattedDate);
    if (hasDiary) {
      setPromptModal({ isOpen: true, date: formattedDate, type: "detail" });
    } else {
      setPromptModal({ isOpen: true, date: formattedDate, type: "write" });
    }
  };

  const saveSuccessHandler = (date, message) => {
    openModal(message, "", "success");
    setMarkedDates((prev) => [...prev, date]);
    setPromptModal({ isOpen: true, date: date, type: "detail" });
  };

  const updateSuccessHandler = (date, message) => {
    openModal(message, "", "success");
    setPromptModal({ isOpen: true, date: date, type: "detail" });
  };

  const deleteSuccessHandler = (date, message) => {
    openModal(message, "", "success");
    setMarkedDates((prev) => prev.filter((markedDate) => markedDate !== date));
    setPromptModal({ isOpen: false, date: "", type: "" });
  };

  const addDot = ({ date, view }) => {
    if (view === "month") {
      const compareDates = moment(date).format("YYYY-MM-DD");

      const hasDiary = markedDates.includes(compareDates);

      if (hasDiary) {
        return <div className="dot"></div>;
      }
    }
    return null;
  };

  return (
    <div css={s.container}>
      <div className="main-container">
        <Calendar
          locale="ko-KR" // 요일/월 한국어로
          onChange={dateOnClickHandler}
          value={today}
          minDate={new Date(principal?.createDt.split("T")[0])}
          maxDate={today}
          view="month" // 월별, 연도별 보기 year, month
          calendarType="hebrew" // 주의 시작 월요일
          formatDay={(locale, date) => moment(date).format("DD")} // 일 떼기
          tileContent={addDot}
          onActiveStartDateChange={({ activeStartDate }) => {
            setCurrentYear(moment(activeStartDate).year());
            setCurrentMonth(moment(activeStartDate).month() + 1);
          }}
        />

        {alertmodal.isOpen && (
          <AlertModal alertModal={alertmodal} onClose={() => closeModal()} />
        )}

        {promptModal.isOpen && (
          <PromptModal
            onClose={() => {
              setPromptModal({ isOpen: false, date: "", type: "" });
            }}
          >
            {promptModal.type === "detail" ? (
              <DiaryDetailModal
                selectedDate={promptModal.date}
                setPromptModal={setPromptModal}
                onDeleteSuccess={deleteSuccessHandler}
                openModal={openModal}
              />
            ) : promptModal.type === "write" ? (
              <DiaryWriteModal
                selectedDate={promptModal.date}
                onSaveSuccess={saveSuccessHandler}
                openModal={openModal}
              />
            ) : (
              <DiaryUpdateModal
                selectedDate={promptModal.date}
                setPromptModal={setPromptModal}
                onUpdateSuccess={updateSuccessHandler}
                openModal={openModal}
              />
            )}
          </PromptModal>
        )}
      </div>
    </div>
  );
}

export default Diary;
