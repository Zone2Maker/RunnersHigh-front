/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import * as s from "./styles";

function YourMessage({ message }, ref) {
  return (
    <div css={s.messageContainer} ref={ref}>
      <img src={message.profileImgUrl} alt="유저 프로필사진" />
      <div>
        <span>{message.nickname}</span>
        <div css={s.messageBox}>{message.message}</div>
      </div>
      <div css={s.timeBox}>
        <p>
          {new Intl.DateTimeFormat("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(new Date(message.createDt))}
        </p>
      </div>
    </div>
  );
}
export default forwardRef(YourMessage);
