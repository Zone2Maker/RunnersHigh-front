/** @jsxImportSource @emotion/react */
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import * as s from "./styles";

function ChatButton({ unReadCnt, openChat }) {
  return (
    <div css={s.container} onClick={openChat}>
      <HiOutlineChatBubbleOvalLeftEllipsis />
      {unReadCnt > 0 && <div css={s.notiDot}></div>}
      <div css={s.notiDot}></div>
    </div>
  );
}

export default ChatButton;
