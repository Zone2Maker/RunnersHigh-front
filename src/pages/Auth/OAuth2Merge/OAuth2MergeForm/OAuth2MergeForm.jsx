/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
import Button from "../../../../components/common/Button/Button";
import InputBox from "../../../../components/common/InputBox/InputBox";
import * as s from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mergeOAuth2UserReq } from "../../../../services/oAuth2/oAuth2Apis";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import { css } from "@emotion/react";
// import { mergeOAuth2UserReq } from "../../../../services/oAuth2/oAuth2Apis";

function OAuth2MergeForm() {
  const [searchParams] = useSearchParams();
  const { principal } = usePrincipalState();

  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [providerUserId, setProviderUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // URL 쿼리 파라미터와 principal에서 값 가져와 상태 세팅
  useEffect(() => {
    const queryEmail = searchParams.get("email") || principal?.email || "";
    const queryProvider = searchParams.get("provider") || "";
    const queryProviderUserId = searchParams.get("providerUserId") || "";

    setEmail(decodeURIComponent(queryEmail));
    setProvider(queryProvider);
    setProviderUserId(queryProviderUserId);

    console.log("OAuth2MergeForm URL:", window.location.href);
    console.log("쿼리 params:", {
      queryEmail,
      queryProvider,
      queryProviderUserId,
    });
  }, [searchParams, principal]);

  // 비밀번호가 입력되었을 때만 버튼 활성화
  const isButtonDisabled = !password;

  const mergeOnClickHandler = async () => {
    console.log("mergeOnClickHandler 실행됨");
    if (password.trim().length === 0) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (isButtonDisabled) return;

    setIsLoading(true);

    try {
      console.log("API 호출 전 데이터:", {
        email,
        password,
        provider,
        providerUserId,
      });
      // 소셜 연동 요청 보내기
      const response = await mergeOAuth2UserReq({
        email: principal?.email || email,
        password,
        provider: searchParams.get("provider"),
        providerUserId: searchParams.get("providerUserId"),
      });

      console.log("API 응답:", response);

      if (response?.data?.status === "success") {
        const accessToken = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        alert(response.data.message);
        setSuccessMessage(response.data.message);

        navigate("/"); // 연동 성공하면 홈으로 이동
      } else if (response?.data?.status === "failed") {
        alert(response.data.message);
        setPassword("");
      }
    } catch (error) {
      alert(error.response?.data?.message || "연동 중 문제가 발생했습니다.");
      setPassword("");
    } finally {
      //성공하든 실패하든, 항상 로딩 상태 해제
      setIsLoading(false);
    }
  };

  if (successMessage) {
    return <div css={s.successMessage}>{successMessage}</div>;
  }

  return (
    <div css={s.oAuth2MergeForm}>
      <InputBox>
        <AuthInput type="email" value={email} disabled />
        <AuthInput
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputBox>
      <Button
        onClick={mergeOnClickHandler}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? "연동 중..." : "연동하기"}
      </Button>
    </div>
  );
}

export default OAuth2MergeForm;
