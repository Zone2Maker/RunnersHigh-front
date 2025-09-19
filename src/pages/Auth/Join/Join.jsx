/** @jsxImportSource @emotion/react */
import JoinForm from "./JoinForm/JoinForm";
import * as s from "./styles";

function Join() {
  return (
    <div css={s.container}>
      <h1 css={s.title}>Join</h1>
      <JoinForm />
    </div>
  );
}

export default Join;
