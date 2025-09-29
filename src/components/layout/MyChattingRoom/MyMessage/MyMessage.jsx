/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import * as s from "./styles";

function MyMessage({ message }, ref) {
  return (
    <div css={s.messageContainer} ref={ref}>
      <div css={s.timeBox}>
        <p>
          {new Intl.DateTimeFormat("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(new Date(message.createDt))}
        </p>
      </div>
      <div>
        <div css={s.messageBox}>{message.message}</div>
      </div>
    </div>
  );
}

// props로 받은 ref를 실제 DOM 요소에 연결시키기 위한 forwardRef
export default forwardRef(MyMessage);
