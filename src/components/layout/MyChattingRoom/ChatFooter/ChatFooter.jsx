/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { publishStomp } from "../../../../configs/stompClient";
import { VscSend } from "react-icons/vsc";
import { usePrincipalState } from "../../../../stores/usePrincipalState";

function ChatFooter({ crewId, isLeaveModalOpen }) {
  const { principal } = usePrincipalState();
  const textareaRef = useRef();
  const [sendMessageValue, setSendMessageValue] = useState("");

  useEffect(() => {
    textareaHeightHandler();
  }, [sendMessageValue]);

  const textareaHeightHandler = () => {
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      // 높이를 'auto'로 초기화해서 정확한 scrollHeight 얻기
      // textarea의 현재 css 높이 무시하고 내용물의 양에 딱 맞는 최소 높이로 DOM을 다시 그릴 준비 함
      // 높이 초기화해서 브라우저가 최소 높이 인식하도록 함
      textareaRef.current.style.height = "auto";
      // 스크롤 높이만큼 높이 설정
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const sendBtnOnClickHandler = () => {
    const newMessage = {
      message: sendMessageValue,
      messageType: "CHAT",
    };
    console.log(newMessage);
    console.log(typeof principal.crewId);

    // 메시지 전송 API
    publishStomp(principal.crewId, newMessage);
  };

  return (
    <div css={s.chatFooter(isLeaveModalOpen)}>
      <textarea
        css={s.textarea}
        placeholder="메세지를 입력해주세요."
        value={sendMessageValue}
        onChange={(e) => setSendMessageValue(e.target.value)}
        onKeyDown={(e) => {
          // 엔터 누르면 줄바꿈 \n도 같이 감 ㅜ
          if (e.key === "Enter") {
            setSendMessageValue("");
            sendBtnOnClickHandler();
          }
        }}
        ref={textareaRef}
      />
      <button
        css={s.sendBtn}
        disabled={
          sendMessageValue.trim() === "" || sendMessageValue.length === 0
        }
        onClick={() => {
          sendBtnOnClickHandler();
          setSendMessageValue("");
        }}
      >
        <VscSend />
      </button>
    </div>
  );
}

export default ChatFooter;
