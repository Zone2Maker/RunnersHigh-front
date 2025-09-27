/** @jsxImportSource @emotion/react */
import Calendar from "react-calendar";
import * as s from "./styles";
import moment from "moment";
import axios from "axios";
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

function Diary() {
  // 캘린더 & 날짜 관련 상태
  const [today, setToday] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());

  //DB 데이터 관련 상태
  const [originalDates, setOriginalDates] = useState([]);
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
  const token = localStorage.getItem("accessToken");

  //알림 모달 상태
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

        // 원본 날짜 저장 (2025-09-26 10:23:45)
        setOriginalDates(dates);

        // 비교/렌더링용 날짜 저장 (YYYY-MM-DD)
        const formattedDates = dates.map((d) => moment(d).format("YYYY-MM-DD"));
        setMarkedDates(formattedDates);

        console.log("API 응답:", dates);
        console.log("Dot 찍힐 날짜:", formattedDates);
      } catch (error) {
        console.error("일지 날짜 불러오기 실패:", error);
        setMarkedDates([]);
        setOriginalDates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkedDates();
  }, [currentYear, currentMonth, principal]);

  //------------------날짜 클릭 시 실행 -> 상세 조회 or 모달-----------------
  const handleDateClick = async (clickedDate) => {
    console.log("Clicked date:", clickedDate);

    const formattedDate = moment(clickedDate).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);

    const hasDiary = markedDates.includes(formattedDate);
    //클릭한 날짜에 일지 있으면
    if (hasDiary) {
      setModalMode("view"); // 일지 있음 -> 조회모드 모달
      try {
        const resp = await getDiaryDetailByDateReq(formattedDate);
        
        if (resp.status === 200 && resp.data.data) {
          setDiaryDetail(resp.data.data);
        } else {
          setDiaryDetail(null);
        }
      } catch (error) {
        console.error("일지 상세 조회 실패:", error);
        setDiaryDetail(null);
      }
    } else {
      setModalMode("write");
      setNewDiaryContent("");
    }
    setIsModalOpen(true);
  };

  //---------------------2. 작성 모드 모달 - 저장 버튼 클릭--------------------
  const handleSaveDiary = async () => {
    if (!newDiaryContent.trim()) {
      setAlertMessage("추가할 내용을 작성해주세요.");
      setAlertModalOpen(true);
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
      if (resp.status === 200) {
        setAlertMessage("일지가 성공적으로 등록되었습니다.");
        setAlertModalOpen(true);

        //dot 즉시 업데이트
        setMarkedDates((prev) => [...prev, selectedDate]);
        setDiaryDetail({ diaryContent: newDiaryContent });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("일지 등록 실패: ", error);
      setAlertMessage("일지 저장에 실패했습니다.");
      setAlertModalOpen(true);
    }
  };

  //점 찍어주는 함수 - DB 에서 받은 markedDates 포함된 날짜면 dot
  const addDot = ({ date, view }) => {
    if (view === "month") {
      const compareDates = moment(date).format("YYYY-MM-DD");
      const hasDiary = markedDates.includes(compareDates);
      // DB에서 가져온 diaryDates 배열에 해당 날짜가 있는지 확인
      if (hasDiary) {
        return <div className="dot"></div>;
      } else {
        //글 없으면 빈공간 (div 는 크기 고정)
        return null;
      }
    }
    return null;
  };

  return (
    <div css={s.container}>
      <div className="main-container">
        <Calendar
          locale="ko-KR" // 요일/월 한국어로
          onChange={handleDateClick}
          value={today}
          maxDate={lastDayOfCurMonth} // 날짜 범위 제한, (min, max)Date
          view="month" // 월별, 연도별 보기 year, month
          calendarType="hebrew" // 주의 시작 월요일
          formatDay={(locale, date) => moment(date).format("DD")} // 일 떼기
          tileContent={addDot} // 타일 컨텐츠 커스텀, 위에서 함수 만들어서 넣어주면 될 듯
          onActiveStartDateChange={({ activeStartDate }) => {
            setCurrentYear(moment(activeStartDate).year());
            setCurrentMonth(moment(activeStartDate).month() + 1);
          }}
        />

        {isModalOpen && (
          <PromptModal onClose={() => setIsModalOpen(false)}>
            {modalMode === "view" ? (
              <DiaryDetailModal
                selectedDate={selectedDate}
                diaryDetail={diaryDetail}
              />
            ) : (
              <DiaryWriteModal
                selectedDate={selectedDate}
                newDiaryContent={newDiaryContent}
                setNewDiaryContent={setNewDiaryContent}
                onClose={() => setIsModalOpen(false)}
                handleSaveDiary={handleSaveDiary}
              />
            )}
          </PromptModal>
        )}
        {alertModalOpen && (
          <AlertModal onClose={() => setAlertModalOpen(false)}>
            {alertMessage}
          </AlertModal>
        )}
      </div>
    </div>
  );
}

export default Diary;
