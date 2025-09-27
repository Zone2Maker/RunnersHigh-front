/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function MyMessage({ message }) {
  return (
    <div css={s.messageContainer}>
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
        <div css={s.messageBox}>
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
}

export default MyMessage;
