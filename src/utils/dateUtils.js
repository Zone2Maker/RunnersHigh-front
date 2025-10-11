import moment from "moment";

// O월 O주차로 변환하는 함수
export const getMonthWeek = (date) => {
  const momentDate = moment(date);
  const month = momentDate.month() + 1;

  // 'N'주차 계산
  // 이번주의 연간 주차 - 이달 1일의 연간 주차

  // 기준일이 속한 주의 시작일(일요일) 구하기
  const startOfWeek = momentDate.clone().startOf("week");

  // 그 주의 시작일이 몇 월인지 확인
  const monthOfStartOfWeek = startOfWeek.month() + 1;

  // 오늘이 8월 2일인데, 주의 시작이 7월 27일인 경우 -> 7월의 마지막주
  if (month != monthOfStartOfWeek) {
    const lastDayOfPrevMonth = momentDate
      .clone()
      .subtract(1, "month")
      .endOf("month");
    return getMonthWeek(lastDayOfPrevMonth); // 재귀 호출로 이전 달의 마지막 주차를 가져옴
  }

  // (오늘의 일자 + 그 달의 1일의 요일) / 7로 주차 계산

  // 이번달 1일의 요일 -> 일요일(0)
  // 달력의 첫 주에 있는 빈 칸이 몇 개인지 알 수 있음
  const firstDayOfMonth = momentDate.clone().startOf("month").day();
  // 달력 첫째 주 빈 칸부터 오늘까지 총 몇 칸?
  // 저번달 말일까지의 칸 수(빈 칸) + 오늘 날짜까지의 칸 수를
  // 7로 나누면 이번주가 몇 주차인지 알 수 있음
  const weekOfMonth = Math.ceil((momentDate.date() + firstDayOfMonth) / 7);
  return `${month}월 ${weekOfMonth}주차`;
};

// 오늘 기준으로 저번주가 O월 O주차인지 계산하는 함수
export const getLastWeek = (date) => {
  const dateInLastWeek = moment(date).subtract(1, "week");

  return getMonthWeek(dateInLastWeek);
};

// 저번 주의 시작일과 마지막일을 계산하는 함수
export const getLastWeekStartAndEnd = (date) => {
  // 일요일 시작 토요일 끝
  const momentDate = moment(date);
  const lastWeek = momentDate.clone().subtract(1, "week");
  const start = lastWeek.clone().startOf("week").format("YYYY-MM-DD");
  const end = lastWeek.clone().endOf("week").format("YYYY-MM-DD");

  return { start, end };
};

// 이번주의 시작일과 마지막일을 계산하는 함수
export const getThisWeekStartAndEnd = (date) => {
  const momentDate = moment(date);
  const start = momentDate.clone().startOf("week").format("YYYY-MM-DD");
  const end = momentDate.clone().endOf("week").format("YYYY-MM-DD");

  return { start, end };
};

// xxxx년 xx월 xx일 형식으로 바꿔주는 함수
export const formatDate = (date) => {
  const momentDate = moment(date);

  return momentDate.format("YYYY년 MM월 DD일");
};

// xxxx-xx-xx 형식으로 바꿔주는 함수
export const formatDate2 = (date) => {
  const momentDate = moment(date);
  return momentDate.format("YYYY-MM-DD");
};

// 오늘 날짜부터 7일 전까지의 기간을 계산하는 함수
export const getLast7Days = (date) => {
  const momentDate = moment(date);
  console.log(momentDate);
  const end = momentDate.clone().format("YYYY-MM-DD"); // 오늘
  const start = momentDate.clone().subtract(7, "days").format("YYYY-MM-DD"); // 7일 전

  return { start, end };
};
