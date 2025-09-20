/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import OAuth2MergeForm from "./OAuth2MergeForm/OAuth2MergeForm";
import * as s from "./styles";

function OAuth2Merge() {
  const [searchParams] = useSearchParams();

  // URL에서 쿼리 파라미터 가져옴
  const email = searchParams.get("email");
  const provider = searchParams.get("provider");
  const providerUserId = searchParams.get("providerUserId");
  return (
    <div css={s.container}>
      <div css={s.titleContainer}>
        <h1 css={s.title}>Welcome</h1>
        <p>소셜로 간편 로그인 정보 불러오기</p>
      </div>
      <OAuth2MergeForm />
    </div>
  );
}

export default OAuth2Merge;
