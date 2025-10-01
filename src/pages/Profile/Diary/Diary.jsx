/** @jsxImportSource @emotion/react */
import Calendar from "react-calendar";
import * as s from "./styles";
import moment from "moment";
import "./Calendar.css";
import { useEffect, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";

import {
  addDiaryReq,
  getActiveListByDateReq,
  getDiaryDetailByDateReq,
} from "../../../services/diary/diaryApis";
import DiaryDetailModal from "./DiaryDetailModal/DiaryDetailModal.jsx";
import DiaryWriteModal from "./DiaryWriteModal/DiaryWriteModal.jsx";
import PromptModal from "../../../components/common/PromptModal/PromptModal.jsx";
import AlertModal from "../../../components/common/AlertModal/AlertModal.jsx";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareError,
} from "react-icons/bi";

function Diary() {
  // 캘린더 & 날짜 관련 상태
  const [today, setToday] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const [markedDates, setMarkedDates] = useState([]); //DB 에서 가져온 일지 쓴 날짜리스트
  const [isLoading, setIsLoading] = useState(false);

  //모달 관련 상태
  const [selectedDate, setSelectedDate] = useState(null); //선택된 날짜
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); //view: 상세보기 / write: 일지 작성
  const [diaryDetail, setDiaryDetail] = useState(null); // 'view' 모드용 상세 데이터
  const [newDiaryContent, setNewDiaryContent] = useState(""); // 'write' 모드용 text

  const { principal } = usePrincipalState();
  const lastDayOfCurMonth = moment().endOf("month").toDate();

  //알림 모달 상태
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
    status: "",
  });

  const openModal = (type, message, status) => {
    setModal({ isOpen: true, type, message, status });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "", message: "", status: "" });
  };

  //달력에 . 표시할 데이터 가져오기 - 현재 년월을 기준으로
  //---------------------------월 이동 시 실행--------------------------
  useEffect(() => {
    const fetchMarkedDates = async () => {
      if (!principal) return;
      setIsLoading(true);
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
        openModal(
          "alert",
          "기록 조회에 실패했습니다. 다시 시도해주세요.",
          "fail"
        );
        setMarkedDates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkedDates();
  }, [currentYear, currentMonth, principal]);

  //------------------날짜 클릭 시 실행 -> 상세 조회 or 모달-----------------
  const dateClickHandler = async (clickedDate) => {
    setDiaryDetail(null);

    const formattedDate = moment(clickedDate).format("YYYY-MM-DD");

    setSelectedDate(formattedDate);

    const hasDiary = markedDates.includes(formattedDate);
    if (hasDiary) {
      try {
        const resp = await getDiaryDetailByDateReq(formattedDate);

        if (resp.data.status === "success") {
          setDiaryDetail(resp.data.data);
          openModal("view", "", "");
        }
      } catch (error) {
        openModal(
          "alert",
          "일지 조회에 실패했습니다. 다시 시도해주세요.",
          "fail"
        );
      }
    } else {
      openModal("write", "", "");
      setNewDiaryContent("");
    }
  };

  //---------------------2. 작성 모드 모달 - 저장 버튼 클릭--------------------
  const saveDiaryHandler = async () => {
    if (!newDiaryContent.trim()) {
      openModal("alert", "일지를 작성해주세요.", "fail");
      return;
    }

    //추가할 데이터
    const diaryData = {
      userId: principal.userId,
      date: selectedDate,
      diaryContent: newDiaryContent,
    };

    try {
      const resp = await addDiaryReq(diaryData);
      if (resp.data.status === "success") {
        openModal("alert", "일지를 등록했습니다.", "success");

        setMarkedDates((prev) => [...prev, selectedDate]);
        setDiaryDetail({ diaryContent: newDiaryContent });
      } else {
        openModal(
          "alert",
          "서버에 오류가 발생했습니다. 다시 시도해주세요.",
          "fail"
        );
        return;
      }
    } catch (error) {
      openModal(
        "alert",
        "서버에 오류가 발생했습니다. 다시 시도해주세요.",
        "fail"
      );
    }
  };

  // 점 찍어주는 함수 - DB에서 받은 markedDates 포함된 날짜면 dot
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
          onChange={dateClickHandler}
          value={today}
          minDate={new Date(principal.createDt.split("T")[0])}
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

        {modal.isOpen ? (
          modal.type === "alert" ? (
            <AlertModal onClose={() => closeModal()}>
              {modal.status === "success" ? (
                <BiSolidMessageSquareCheck
                  size={"60px"}
                  style={{ color: "#00296b" }}
                />
              ) : (
                <BiSolidMessageSquareError
                  size={"60px"}
                  style={{ color: "#f57c00" }}
                />
              )}
              <strong>{modal.message}</strong>
            </AlertModal>
          ) : (
            <PromptModal
              onClose={() => {
                modal.status === "success" ? location.reload() : closeModal();
              }}
            >
              {modal.type === "view" ? (
                <DiaryDetailModal
                  selectedDate={selectedDate}
                  diaryDetail={diaryDetail}
                />
              ) : (
                <DiaryWriteModal
                  selectedDate={selectedDate}
                  newDiaryContent={newDiaryContent}
                  setNewDiaryContent={setNewDiaryContent}
                  saveDiaryHandler={saveDiaryHandler}
                />
              )}
            </PromptModal>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Diary;
