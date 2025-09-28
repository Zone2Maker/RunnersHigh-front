/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function SystemMessage({ message }) {
  return (
    <div css={s.messageContainer}>
      <div css={s.messageBox}>{message}</div>
    </div>
  );
}

export default SystemMessage;
