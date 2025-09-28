/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MyMessage from "../MyMessage/MyMessage";
import YourMessage from "../YourMessage/YourMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import {
  getInitialMessageListReq,
  getLastReadMessageIdReq,
  getMessageListReq,
  updateLastReadMessageIdReq,
} from "../../../../services/message/messageApis";

function ChatMain({ isLeaveConfirmOpen, setIsChatOpen }) {
  const SIZE = 50;
  const principal = usePrincipalState();
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastReadId, setLastReadId] = useState(0);
  const [prevCursorId, setPrevCursorId] = useState(0); // 상향 ID
  const [nextCursorId, setNextCursorId] = useState(0); // 하향 ID

  // ref
  const chatMainRef = useRef(null);
  const lastReadMessageRef = useRef(null);
  // const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollHeightRef = useRef(0);
  const isInitialScrolled = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const topObserver = useRef(null);
  const bottomObserver = useRef(null);

  // 마운트 시 메시지 목록 최초 요청
  useEffect(() => {
    getLastReadMessageIdReq(principal.crewId).then((resp) => {
      const lastReadId = resp.data.data;
      setLastReadId(resp);

      console.log(lastReadId);
      getInitialMessageListReq(principal.crewId, resp.data.data, SIZE).then(
        (resp) => {
          if (resp.data.status === "failed") {
            setIsChatOpen();
            setErrorMessage(resp.data.message);
            return;
          }

          const newMessages = resp.data.data.messages;
          console.log(newMessages);

          let slicedMessages = null;

          if (newMessages.length < 100) {
            // 첫 요청의 메시지 개수가 100개 미만일 때
            if (newMessages[50].messageId > lastReadId) {
              // 메시지 목록의 50번 메시지의 messageId가 lastReadId보다 크다면
              // newMessages[0] 이전의 메시지가 없는 것
              // => 즉, 이전 채팅은 더 불러올 게 없음
              setPrevCursorId(null);
              setNextCursorId(newMessages[newMessages.length - 1].messageId);
              slicedMessages = newMessages.slice(0, newMessages.length - 1);
            } else if (newMessages[50].messageId === lastReadId) {
              // 메시지 목록의 50번 메시지의 messageId가 lastReadId와 같다면
              // 이전 메세지는 50개 다 가져온 것이므로 newMessages 이후의 메시지가 없는 것
              // => 즉, 이후 채팅은 더 불러올 게 없음
              setPrevCursorId(newMessages[0].messageId);
              setNextCursorId(null);
              slicedMessages = newMessages.slice(1, newMessages.length);
            }
          } else {
            // 첫 요청의 메시지 개수가 100개일 때
            // 이전 / 이후 채팅 더 있음
            setPrevCursorId(newMessages[0].messageId);
            setNextCursorId(newMessages[newMessages.length - 1].messageId);
            slicedMessages = newMessages.slice(1, newMessages.length - 1);
          }

          setMessages(slicedMessages);
        }
      );
    });

    return () => {
      updateLastReadMessageIdReq(principal.crewId).then((response) =>
        console.log(response)
      );
    };
  }, []);

  useLayoutEffect(() => {
    // if (isScrolled) return;
    if (!chatMainRef.current || messages.length === 0) {
      return;
    }
    // 맨 처음 실행
    if (lastReadMessageRef.current && !isInitialScrolled.current) {
      lastReadMessageRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      isInitialScrolled.current = true;
      return;
    }

    // 나머지 실행
    // 이전 메시지 로딩 했음
    if (prevScrollHeightRef > 0) {
      const scrollOffset =
        chatMainRef.current.scrollHeight - prevScrollHeightRef;
      chatMainRef.current.scrollTop += scrollOffset;
      prevScrollHeightRef.current = 0;
    }

    // requestAnimationFrame(() => setIsScrolled(true));
    // requestAnimationFrame(() => setIsScrolled(true));
  }, [messages, lastReadMessageRef]);

  useEffect(() => {
    // if (!isScrolled) return;
    if (!messages || !chatMainRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && prevCursorId !== null && !isLoading) {
          // 요청 직전
          prevScrollHeightRef.current = chatMainRef.current.scrollHeight;
          setIsLoading(true);
          const direction = "prev";
          getMessageListReq(
            principal.crewId,
            prevCursorId,
            direction,
            SIZE
          ).then((response) => {
            if (response.data.status === "failed") {
              setIsChatOpen(false);
              setErrorMessage(response.data.message);
            }

            console.log(response);
            setPrevCursorId(response.data.data.newCursorId);
            const reversedMessages = response.data.data.messages.reverse();
            console.log(reversedMessages);
            setMessages((prev) => [...reversedMessages, ...prev]);
            setIsLoading(false);
          });
        }
      },
      {
        root: chatMainRef.current,
        threshold: 0.1,
      }
    );
    observer.observe(topObserver.current);
    return () => observer.disconnect();
    // }, [messageList, prevCursorId, principal, setIsChatOpen, isScrolled]);
  }, [messages, prevCursorId, principal, setIsChatOpen, isLoading]);

  useEffect(() => {
    // if (!isScrolled) return;
    if (!messages || !chatMainRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursorId !== null) {
          const direction = "next";
          getMessageListReq(
            principal.crewId,
            nextCursorId,
            direction,
            SIZE
          ).then((response) => {
            if (response.data.status === "failed") {
              setIsChatOpen(false);
              setErrorMessage(response.data.message);
            }

            setPrevCursorId(response.data.data.newCursorId);
            const newMessages = response.data.data.messages;
            setMessages((prev) => [...prev, ...newMessages]);
          });
        }
      },
      { root: chatMainRef.current, threshold: 0.1 }
    );
    observer.observe(bottomObserver.current);
    return () => observer.disconnect();
  }, [messages, nextCursorId, principal, setIsChatOpen]);
  // }, [messageList, nextCursorId, principal, setIsChatOpen, isScrolled]);

  return (
    <div css={s.chatMain(isLeaveConfirmOpen)} ref={chatMainRef}>
      <div ref={topObserver} css={s.obserber} />
      {messages.map((message) => {
        if (
          message.messageType === "ENTER" ||
          message.messageType === "LEAVE"
        ) {
          return (
            <div key={message.messageId}>
              <SystemMessage message={message.message} />
            </div>
          );
        }
        const isMine = principal.userId === message.userId;
        const isLastRead = message.messageId === lastReadId;

        if (isLastRead) {
          return (
            <div
              key={message.messageId}
              ref={lastReadMessageRef}
              css={s.lastReadMessageBox(isLeaveConfirmOpen)}
            >
              {isMine ? (
                <MyMessage message={message} />
              ) : (
                <YourMessage message={message} />
              )}
              {nextCursorId !== null && (
                <SystemMessage message={"여기까지 읽었습니다."} />
              )}
            </div>
          );
        }

        return isMine ? (
          <MyMessage key={message.messageId} message={message} />
        ) : (
          <YourMessage key={message.messageId} message={message} />
        );
      })}
      <div ref={bottomObserver} css={s.obserber} />
    </div>
  );
}

export default ChatMain;
