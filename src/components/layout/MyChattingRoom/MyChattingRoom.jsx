/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { IoExitOutline } from "react-icons/io5";
import {
  getLastReadMessageIdReq,
  getMessageListReq,
  updateLastReadMessageIdReq,
} from "../../../services/message/messageApis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { VscSend } from "react-icons/vsc";

function MyChattingRoom({ message, crewInfo, isChatOpen }) {
  const size = 50;
  const { principal } = usePrincipalState();
  const [errorMessage, setErrorMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [lastReadMessageId, setLastReadMessageId] = useState(0);

  const chatMainRef = useRef(null);
  const scrollDownRef = useRef(null);
  const [initialScroll, setInitialScroll] = useState(false);

  const prevReadMessageIdRef = useRef(0);
  const [prevReadMessageId, setPrevReadMessageId] = useState(0);

  useEffect(() => {
    prevReadMessageIdRef.current = prevReadMessageId;
    console.log(prevReadMessageId);
  }, [prevReadMessageId]);

  useEffect(() => {
    console.log("마운트");
    getLastReadMessageIdReq(principal?.crewId).then((response) => {
      setLastReadMessageId(response.data.data);
      console.log(response.data.data);
    });
    return () => {
      console.log("언마운트", prevReadMessageIdRef.current);

      if (principal?.crewId && prevReadMessageIdRef.current) {
        updateLastReadMessageIdReq(
          principal.crewId,
          prevReadMessageIdRef.current
        );
      }
      setMessageList([]);
      setInitialScroll(false);
    };
  }, []);

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["messageList", principal.crewId, size],
    queryFn: ({ pageParam }) => {
      const { nextCursorId, prevCursorId, direction } = pageParam || {
        nextCursorId: lastReadMessageId + 1,
        prevCursorId: lastReadMessageId,
        direction: "prev",
      };

      return getMessageListReq(
        principal.crewId,
        prevCursorId,
        nextCursorId,
        size,
        direction
      );
    },
    getNextPageParam: (lastPage) => {
      const nextCursorId = lastPage?.data?.data?.nextCursorId ?? undefined;
      const prevCursorId = lastPage?.data?.data?.prevCursorId ?? undefined;
      return nextCursorId
        ? {
            nextCursorId,
            prevCursorId,
            direction: "next",
          }
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const nextCursorId = firstPage?.data?.data?.nextCursorId ?? undefined;
      const prevCursorId = firstPage?.data?.data?.prevCursorId ?? undefined;
      return prevCursorId
        ? {
            prevCursorId,
            nextCursorId,
            direction: "prev",
          }
        : undefined;
    },
    enabled: !!lastReadMessageId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isLoading || isError) return;

    const newMessageList = data?.pages
      ? data.pages
          .flatMap((page) => page.data.data.messages)
          .sort((a, b) => a.messageId - b.messageId)
      : [];
    console.log(newMessageList);
    setMessageList(newMessageList);
  }, [data, isError, isLoading]);

  useLayoutEffect(() => {
    if (initialScroll) return;
    if (isLoading || isError) return;
    if (!messageList.length) return;
    if (!scrollDownRef.current || !chatMainRef.current) return;

    console.log("이전 스크롤");
    chatMainRef.current.scrollTop = scrollDownRef.current.offsetTop;
    requestAnimationFrame(() => setInitialScroll(true));
  }, [messageList, isLoading, isError, initialScroll, lastReadMessageId]);

  useEffect(() => {
    if (!initialScroll) return;
    if (!chatMainRef.current || !prevReadMessageId) return;
    if (isFetchingPreviousPage) return;

    const target = chatMainRef.current.querySelector(
      `[data-msgid="${prevReadMessageId}"]`
    );

    if (target) {
      console.log("이후 스크롤");
      chatMainRef.current.scrollTop = target.offsetTop;
    }
  }, [messageList, isFetchingPreviousPage]);

  useLayoutEffect(() => {}, []);

  const topObserver = useRef(null);
  useEffect(() => {
    if (!chatMainRef.current || !topObserver.current) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasPreviousPage &&
            !isFetchingPreviousPage
          ) {
            fetchPreviousPage();
          }
        },
        { root: chatMainRef.current, threshold: 0.1 }
      );
      observer.observe(topObserver.current);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    prevReadMessageId,
  ]);

  const visibleMsgIdsRef = useRef(new Set());
  useEffect(() => {
    if (!messageList.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const messageId = Number(entry.target.dataset.msgid);

          if (entry.isIntersecting) {
            visibleMsgIdsRef.current.add(messageId);
          } else {
            visibleMsgIdsRef.current.delete(messageId);
          }
        });

        // 현재 화면에 보이는 메시지 중 가장 작은 msgId 찾기
        if (visibleMsgIdsRef.current.size > 0) {
          const maxId = Math.min(...Array.from(visibleMsgIdsRef.current));
          setPrevReadMessageId(maxId);
        }
      },
      { root: chatMainRef.current, threshold: 1 }
    );

    messageList.forEach((message) => {
      const element = document.querySelector(
        `[data-msgid="${message.messageId}"]`
      );
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [messageList]);

  const bottomObserver = useRef(null);
  useEffect(() => {
    if (!chatMainRef.current || !bottomObserver.current) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { root: chatMainRef.current, threshold: 0.1 }
      );
      observer.observe(bottomObserver.current);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div
      css={[
        s.chatBox,
        isChatOpen && {
          opacity: "1",
          visibility: "visible",
          transform: "translateY(0)",
        },
      ]}
    >
      <div css={s.chatHeader}>
        <div>
          <img src={crewInfo.crewImgUrl} alt="크루 대표사진" />
          <p>{crewInfo.crewName}</p>
        </div>
        <IoExitOutline />
      </div>
      <div css={s.chatMain} ref={chatMainRef}>
        <div ref={topObserver} style={{ padding: "1px" }} />
        {messageList.map((message) => {
          if (message.messageType === "ENTER") {
            return (
              <div
                css={s.systemChat}
                key={message.messageId}
                data-msgid={message.messageId}
              >
                {message.message}
              </div>
            );
          }

          if (message.userId === principal.userId) {
            if (lastReadMessageId === message.messageId) {
              return (
                <div
                  key={message.messageId}
                  css={s.lastReadMessageBox}
                  data-msgid={message.messageId}
                  ref={scrollDownRef}
                >
                  <div css={s.myChat}>
                    <div>
                      <div>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                  <div css={s.systemChat}>여기까지 읽으셨습니다.</div>
                </div>
              );
            }
            return (
              <div
                css={s.myChat}
                key={message.messageId}
                data-msgid={message.messageId}
              >
                <div>
                  <div>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          } else {
            if (lastReadMessageId === message.messageId) {
              return (
                <div
                  key={message.messageId}
                  css={s.lastReadMessageBox}
                  data-msgid={message.messageId}
                  ref={scrollDownRef}
                >
                  <div css={s.yourChat}>
                    <img src={message.profileImgUrl} alt="유저 프로필사진" />
                    <div>
                      <span>{message.nickname}</span>
                      <div>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                  <div css={s.systemChat}>여기까지 읽으셨습니다.</div>
                </div>
              );
            }
            return (
              <div
                css={s.yourChat}
                key={message.messageId}
                data-msgid={message.messageId}
              >
                <img src={message.profileImgUrl} alt="유저 프로필사진" />
                <div>
                  <span>{message.nickname}</span>
                  <div>
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <div ref={bottomObserver} style={{ padding: "1px" }} />
      </div>
      <div css={s.chatInput}>
        <textarea placeholder="메세지를 입력해주세요." />
        <VscSend />
      </div>
    </div>
  );
}

export default MyChattingRoom;
