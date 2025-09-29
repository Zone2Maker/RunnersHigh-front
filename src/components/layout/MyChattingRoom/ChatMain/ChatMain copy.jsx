/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MyMessage from "../MyMessage/MyMessage";
import YourMessage from "../YourMessage/YourMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import {
  getInitialMessageListReq,
  getLastReadMessageIdReq,
  getMessageListReq,
  updateLastReadMessageIdReq,
} from "../../../../services/message/messageApis";

function ChatMain({ isLeaveConfirmOpen, setIsChatOpen, setAlertModal }) {
  const SIZE = 50;
  const SYSTEM_MESSAGE_TYPE = ["ENTER", "LEAVE"];
  const { principal } = usePrincipalState();
  const [messages, setMessages] = useState([]);
  const [lastReadId, setLastReadId] = useState(null);
  const [prevCursorId, setPrevCursorId] = useState(null); // 상향 ID
  const [nextCursorId, setNextCursorId] = useState(null); // 하향 ID

  // ref
  const initialLoadRef = useRef(false); // 컴포넌트 마운트 상태 추적
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
    // react의 strict mode (최초 useEffect 중복 요청) 방지

    // true면 이미 호출됨!
    if (initialLoadRef.current) {
      return;
    }

    const initializeChat = async () => {
      // 1. lastReadId
      try {
        // 첫 API 호출 직전에 플래그 설정
        initialLoadRef.current = true;

        const lastReadResp = await getLastReadMessageIdReq(principal.crewId);
        const lastReadId = lastReadResp.data.data;

        setLastReadId(lastReadId);
        console.log("마지막으로 읽은 메시지ID: ", lastReadId);

        // 2. 초기 메시지 목록
        const initialListResp = await getInitialMessageListReq(
          principal.crewId,
          lastReadId,
          SIZE
        );

        if (initialListResp.data.status === "failed") {
          setIsChatOpen();
          setAlertModal(true, initialListResp.data.message, "fail");
          return;
        }

        const newMessages = initialListResp.data.data.messages;
        console.log("첫 요청: ", newMessages); // 100개여야 함

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

        // 중복 메시지 필터링
        setMessages((prev) => {
          // 이미 존재하는 messageId를 set에 저장
          const existingIds = new Set(prev?.map((msg) => msg.messageId));

          // 새로운 메시지 중 set에 없는 메시지만 필터링
          const newUniqueMessages = slicedMessages.filter(
            (msg) => !existingIds.has(msg.messageId)
          );

          // 중복없는 메시지를 기존 배열에 추가
          return [...prev, ...newUniqueMessages];
        });
      } catch (error) {
        console.error("채팅 목록 불러오기 실패", error);
        setIsChatOpen();
        setAlertModal(true, "채팅 데이터 로드에 실패했습니다.", "fail");
      }
    };

    initializeChat();

    // 클린업 함수, 채팅방 언마운트시 마지막으로 읽은 메시지ID 업데이트
    // return () => {
    // updateLastReadMessageIdReq(principal.crewId).then((response) =>
    //   console.log(response)
    // );
    // };
  }, []);

  useEffect(() => {
    // if (!isScrolled) return;
    // 맨 처음에 막아야 함
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
              setIsChatOpen();
              setAlertModal(true, response.data.message, "fail");
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
  }, [prevCursorId, principal, isLoading]);

  useEffect(() => {
    // if (!isScrolled) return;
    // 조건이 잘못됨 애초에 messages를 초기화할 때 '빈 배열'로 할당하기 때문에 !messages가 맞으려면 null이어야함
    // messages.length === 0을 걸어버리면 ㄱㅊ할듯
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
              setAlertModal(true, response.data.message, "fail");
            }

            setNextCursorId(response.data.data.newCursorId);
            const newMessages = response.data.data.messages;
            console.log(newMessages);

            setMessages((prev) => [...prev, ...newMessages]);
          });
        }
      },
      { root: chatMainRef.current, threshold: 0.1 }
    );
    observer.observe(bottomObserver.current);
    return () => observer.disconnect();
  }, [nextCursorId, principal]);

  // 렌더링 직전 실행
  useLayoutEffect(() => {
    // chatMainRef가 false거나 messages가 없으면 실행xx
    if (!chatMainRef.current || !messages) {
      return;
    }

    // 여기까지 읽었습니다 위치로 한 번만 이동
    // '마지막으로 읽은 메시지'를 가리키는 ref가 DOM에 연결되어 있으며
    // '최초 스크롤을 실행한 적이 없다면'
    // => 마지막으로 읽은 메시지가 화면에 존재하고, 그 위치로 자동 스크롤을 시킨 적이 없다면
    if (lastReadMessageRef.current && !isInitialScrolled.current) {
      // scrollIntoView(): 해당 요소를 뷰안으로 스크롤
      // 즉, '마지막으로 읽은 메세지'를 가리키는 ref를 화면의 최상단(start)에
      lastReadMessageRef.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      isInitialScrolled.current = true;
      return;
    }

    // 스크롤 위치 보정 로직, 최상단이 0
    // 이전 스크롤 위치가 있다면.
    if (prevScrollHeightRef.current > 0) {
      // 현재 렌더링된 chatMain이라는 DOM 요소의 높이 - 이전 DOM 요소의 높이
      // 즉, 새로 쌓인 메세지의 높이
      const scrollOffset =
        chatMainRef.current.scrollHeight - prevScrollHeightRef;
      // chatMainRef의 스크롤을 높이 차만큼 더해주기 (최상단이 0이니까)
      chatMainRef.current.scrollTop += scrollOffset;
      prevScrollHeightRef.current = 0;
    }
  }, [messages, lastReadMessageRef]);

  return (
    <div css={s.chatMain(isLeaveConfirmOpen)} ref={chatMainRef}>
      <div ref={topObserver} css={s.observer} />
      {messages?.map((message) => {
        const isSystem = SYSTEM_MESSAGE_TYPE.includes(message.messageType);
        const isMine = principal.userId === message.userId;
        // message의 Id가 lastReadId와 같으면 마지막으로 읽은 메시지
        const isLastRead = message.messageId === lastReadId;
        // 실제 컴포넌트를 변수에 담기
        let MessageType;
        if (isSystem) {
          MessageType = SystemMessage;
        } else if (isMine) {
          MessageType = MyMessage;
        } else {
          MessageType = YourMessage;
        }

        return (
          // 리액트 입장에서는 각 배열이 [<>,<>,<>,...]
          // 각 아이템인 <> 자체에 키가 없기 때문에.. <>에 key를 붙여달라는 오류가 뜸
          // Fragment를 직접 쓰면 자식 요소에는 키를 주지 않아도 된다.
          <Fragment key={message.messageId}>
            {/* ref를 컴포넌트에 넘겨주기만 하면 안됨
              리액트는 ref를 DOM 요소에 직접 연결하려고 하는데 MessageType(My,Your)은 컴포넌트(함수)이지 DOM 요소가 아님
              그래서 각각의 컴포넌트에 forwardRef를 줘야한다.
            */}
            <MessageType
              message={isSystem ? message.message : message}
              ref={isLastRead ? lastReadMessageRef : null}
            />
            {isLastRead && nextCursorId !== null && (
              <SystemMessage message={"여기까지 읽었습니다."} />
            )}
          </Fragment>
        );
      })}
      <div ref={bottomObserver} css={s.observer} />
    </div>
  );
}

export default ChatMain;
