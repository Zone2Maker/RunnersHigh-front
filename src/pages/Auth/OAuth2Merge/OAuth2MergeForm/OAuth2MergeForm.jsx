/** @jsxImportSource @emotion/react */
import { useState } from "react";
import AuthInput from "../../../../components/common/AuthInput/AuthInput";
import Button from "../../../../components/common/Button/Button";
import InputBox from "../../../../components/common/InputBox/InputBox";
import * as s from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { mergeOAuth2UserReq } from "../../../../services/oAuth2/oAuth2Apis";

function OAuth2MergeForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

//   const mergeOnClickHandler = () => {
//     if (email.trim().length === 0 || password.trim().length === 0) {
//       alert("이메일과 비밀번호를 올바르게 입력해주세요.");
//       return;
//     } else {
//       //소셜 연동 요청 보내기
//       mergeOAuth2UserReq({
//         email: email,
//         password: password,
//         provider: searchParam.get("provider"),
//         providerId: searchParam.get("ProviderId"),
//       }).then((response) => {
//         console.log(response.data);
//         if(response.data.status == "success") {
//             const accessToken = response.data.data;
//             localStorage.setItem("accessToken", accessToken);
//             alert(response.data.message);
//             navigate("/")       //연동 성공하면 홈으로 이동
//         } else if (
//             alert(response.data.message);
//             setEmail("");
//             setPassword("");
//             return;
//         }
//       );

//     }
//   };

  return (
    <div css={s.oAuth2MergeForm}>
      <InputBox>
        <AuthInput
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputBox>
      <Button>연동하기</Button>
    </div>
  );
}

export default OAuth2MergeForm;
