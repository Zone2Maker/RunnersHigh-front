import { useState } from "react";
import { checkUserExistReq } from "../services/user/userApis";

export const useCheckDuplicate = () => {
  const [isLoading, setIsLoading] = useState(false);
  // null: 초기, true: 사용가능, false: 중복
  const [isAvailable, setIsAvailable] = useState(null);
  const [message, setMessage] = useState("");

  const reset = async () => {
    setIsLoading(false);
    setIsAvailable(true);
    setMessage("");
  };

  const checkExist = async (type, value) => {
    // 함수 호출 시 입력값 유효성 검사
    if (!value || !value.trim()) {
      setIsAvailable(null);
      setMessage(`${type === "email" ? "이메일을" : "닉네임을"} 입력해주세요.`);
      return;
    }

    // API 호출에 보낼 파라미터
    const params = {
      email: type === "email" ? value : null,
      nickname: type === "nickname" ? value : null,
    };

    // 요청 보내기 전 상태 초기화
    setIsLoading(true);
    setIsAvailable(null);
    setMessage("");

    try {
      const resp = await checkUserExistReq(params.email, params.nickname);
      if (resp.data.status === "success") {
        setIsAvailable(true);
        setMessage(
          `사용 가능한 ${type === "email" ? "이메일" : "닉네임"}입니다.`
        );
      } else if (resp.data.status === "failed") {
        setIsAvailable(false);
        setMessage(
          `이미 사용중인 ${type === "email" ? "이메일" : "닉네임"}입니다.`
        );
      }
    } catch (error) {
      setIsAvailable(false);
      setMessage(error.response?.data?.message || "오류가 발생했습니다.");
    } finally {
      // 성공이든 실패든 로딩 끝
      setIsLoading(false);
    }
  };

  return { isLoading, isAvailable, message, checkExist, reset };
};
