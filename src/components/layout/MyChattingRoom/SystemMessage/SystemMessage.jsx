/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import * as s from "./styles";

function SystemMessage({ message }, ref) {
  return (
    <div css={s.messageContainer}>
      <div css={s.messageBox}>{message}</div>
    </div>
  );
}

export default forwardRef(SystemMessage);
