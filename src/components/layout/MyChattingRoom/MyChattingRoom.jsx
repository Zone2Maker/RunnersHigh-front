/** @jsxImportSource @emotion/react */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as s from "./styles";
import { VscSend } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
import {
  getInitialMessageListReq,
  getLastReadMessageIdReq,
  getMessageListReq,
  updateLastReadMessageIdReq,
} from "../../../services/message/messageApis";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { useInfiniteQuery } from "@tanstack/react-query";
import MyMessage from "./MyMessage/MyMessage";
import YourMessage from "./YourMessage/YourMessage";
import { data } from "react-router-dom";

function MyChattingRoom({
  pendingMessageList,
  setPendingMessageList,
  crewInfo,
  isChatOpen,
  setIsChatOpen,
}) {
  const size = 50;
  const { principal } = usePrincipalState();
  const [lastReadMessageId, setLastReadMessageId] = useState(0);
  const [prevCursorId, setPrevCursorId] = useState(0);
  const [nextCursorId, setNextCursorId] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const chatMainRef = useRef(null);
  const lastReadMessageRef = useRef(null);
  // const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollHeightRef = useRef(0);
  const initialScrollDone = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const topObserver = useRef(null);
  const bottomObserver = useRef(null);

  const [sendMessageValue, setSendMessageValue] = useState("");

  useEffect(() => {
    getLastReadMessageIdReq(principal.crewId).then((response) => {
      const id = response.data.data;
      setLastReadMessageId(id);
      console.log(id);
      getInitialMessageListReq(principal.crewId, response.data.data, size).then(
        (response) => {
          if (response.data.status === "failed") {
            setIsChatOpen(false);
            setErrorMessage(response.data.message);
            return;
          }

          const messages = response.data.data.messages;

          console.log(messages);
          let slicedMessages = null;
          if (messages.length < 100) {
            if (messages[50].messageId > id) {
              setPrevCursorId(null);
              setNextCursorId(messages[messages.length - 1].messageId);
              slicedMessages = messages.slice(0, messages.length - 1);
            } else if (messages[50].messageId === id) {
              setPrevCursorId(messages[0].messageId);
              setNextCursorId(null);
              slicedMessages = messages.slice(1, messages.length);
            }
          } else {
            setPrevCursorId(messages[0].messageId);
            setNextCursorId(messages[messages.length - 1].messageId);
            slicedMessages = messages.slice(1, messages.length - 1);
          }

          setMessageList(slicedMessages);
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
    if (!chatMainRef.current || messageList.length === 0) {
      return;
    }
    // 맨 처음 실행
    if (lastReadMessageRef.current && !initialScrollDone.current) {
      lastReadMessageRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      initialScrollDone.current = true;
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
  }, [messageList, lastReadMessageRef]);

  useEffect(() => {
    // if (!isScrolled) return;
    if (!messageList || !chatMainRef.current) return;

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
            size
          ).then((response) => {
            if (response.data.status === "failed") {
              setIsChatOpen(false);
              setErrorMessage(response.data.message);
            }

            console.log(response);
            setPrevCursorId(response.data.data.newCursorId);
            const reversedMessages = response.data.data.messages.reverse();
            console.log(reversedMessages);
            setMessageList((prev) => [...reversedMessages, ...prev]);
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
  }, [messageList, prevCursorId, principal, setIsChatOpen, isLoading]);

  useEffect(() => {
    // if (!isScrolled) return;
    if (!messageList || !chatMainRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursorId !== null) {
          const direction = "next";
          getMessageListReq(
            principal.crewId,
            nextCursorId,
            direction,
            size
          ).then((response) => {
            if (response.data.status === "failed") {
              setIsChatOpen(false);
              setErrorMessage(response.data.message);
            }

            setPrevCursorId(response.data.data.newCursorId);
            const messages = response.data.data.messages;
            setMessageList((prev) => [...prev, ...messages]);
          });
        }
      },
      { root: chatMainRef.current, threshold: 0.1 }
    );
    observer.observe(bottomObserver.current);
    return () => observer.disconnect();
  }, [messageList, nextCursorId, principal, setIsChatOpen]);
  // }, [messageList, nextCursorId, principal, setIsChatOpen, isScrolled]);

  return (
    <div css={s.chatContainer(isChatOpen)}>
      <div css={s.chatHeader}>
        <div>
          <img src={crewInfo.crewImgUrl} alt="크루 대표사진" />
          <p>{crewInfo.crewName}</p>
        </div>
        <IoExitOutline />
      </div>
      <div css={s.chatMain} ref={chatMainRef}>
        <div ref={topObserver} css={s.obserber} />
        {messageList.map((message) => {
          if (message.messageType === "ENTER") {
            return (
              <div css={s.systemChat} key={message.messageId}>
                {message.message}
              </div>
            );
          }
          const isMine = principal.userId === message.userId;
          const isLastRead = message.messageId === lastReadMessageId;

          if (isLastRead) {
            return (
              <div
                key={message.messageId}
                ref={lastReadMessageRef}
                css={s.lastReadMessageBox}
              >
                {isMine ? (
                  <MyMessage message={message} />
                ) : (
                  <YourMessage message={message} />
                )}
                {nextCursorId !== null && (
                  <div css={s.systemChat}>여기까지 읽으셨습니다.</div>
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
      <div css={s.chatFooter}>
        <textarea
          placeholder="메세지를 입력해주세요."
          value={sendMessageValue}
          onChange={(e) => setSendMessageValue(e.target.value)}
        />
        <VscSend />
      </div>
    </div>
  );
}

export default MyChattingRoom;
