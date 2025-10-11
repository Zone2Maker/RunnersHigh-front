/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
import Button from "../../../../components/common/Button/Button";
import InputBox from "../../../../components/common/InputBox/InputBox";
import * as s from "./styles";
import { useSearchParams } from "react-router-dom";
import { mergeOAuth2UserReq } from "../../../../services/oAuth2/oAuth2Apis";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

function OAuth2MergeForm({ openModal }) {
  const [searchParams] = useSearchParams();
  const { principal } = usePrincipalState();

  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [providerUserId, setProviderUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // URL 쿼리 파라미터와 principal에서 값 가져와 상태 세팅
  useEffect(() => {
    const queryEmail = searchParams.get("email") || principal?.email || "";
    const queryProvider = searchParams.get("provider") || "";
    const queryProviderUserId = searchParams.get("providerUserId") || "";

    setEmail(decodeURIComponent(queryEmail));
    setProvider(queryProvider);
    setProviderUserId(queryProviderUserId);
  }, [searchParams, principal]);

  const mergeOnClickHandler = async () => {
    if (password.trim().length === 0) {
      openModal("비밀번호를 입력해주세요.", "", "fail");
    }

    setIsLoading(true);

    try {
      // 소셜 연동 요청 보내기
      const response = await mergeOAuth2UserReq({
        email: principal?.email || email,
        password,
        provider: searchParams.get("provider"),
        providerUserId: searchParams.get("providerUserId"),
      });

      if (response?.data?.status === "success") {
        const accessToken = response.data.data;
        localStorage.setItem("accessToken", accessToken);

        openModal(response.data.message, "", "success");
      } else if (response?.data?.status === "failed") {
        openModal(response.data.message, "다시 시도해주세요.", "fail");
        setPassword("");
      }
    } catch (error) {
      openModal(
        "연동 중 문제가 발생했습니다.",
        "다시 시도해주세요.",
        "success"
      );
      setPassword("");
    } finally {
      //성공하든 실패하든, 항상 로딩 상태 해제
      setIsLoading(false);
    }
  };

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
      <Button onClick={mergeOnClickHandler}>
        {isLoading ? "연동 중..." : "연동하기"}
      </Button>
    </div>
  );
}

export default OAuth2MergeForm;
