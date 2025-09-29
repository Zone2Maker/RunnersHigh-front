/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import MyMessage from "../MyMessage/MyMessage";
import YourMessage from "../YourMessage/YourMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrincipalState } from "../../../../stores/usePrincipalState";
import {
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
  const [isInitialized, setIsInitialized] = useState(false); // 초기 세팅 관리

  // ref
  const initialLoadRef = useRef(false); // 컴포넌트 마운트 상태 추적
  const chatMainRef = useRef(null);
  const lastReadMessageRef = useRef(null);
  const prevScrollHeightRef = useRef(0);
  const isInitialScrolled = useRef(false);
  const isLoadingRef = useRef(false); // ref는 값이 바뀌어도 재렌더링x
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
      try {
        // 첫 API 호출 직전에 플래그 설정
        initialLoadRef.current = true;

        // 마지막으로 읽은 메시지ID를 가져오기
        const lastReadResp = await getLastReadMessageIdReq(principal.crewId);
        const lastReadId = lastReadResp.data.data;
        setLastReadId(lastReadId); // 상태 업데이트
        console.log("마지막으로 읽은 메시지ID: ", lastReadId);

        // 2. lastReadId를 기준으로 이전/이후 메시지 동시에 가져오기(Promise.all 병렬 처리 가능)
        const [prevResp, nextResp] = await Promise.all([
          getMessageListReq(principal.crewId, lastReadId, "prev", SIZE),
          getMessageListReq(principal.crewId, lastReadId, "next", SIZE),
        ]);

        // 3. 받아온 메시지들 합쳐서 messages 업데이트
        const prevMessages = prevResp.data.data.messages;
        const nextMessages = nextResp.data.data.messages;
        // lastReadId를 포함해서 각각 50개씩 가져오기 때문에 중간에 하나 중복됨
        const initialMessages = [
          ...prevMessages.reverse(),
          ...nextMessages.slice(1, nextMessages.length),
        ];
        setMessages(initialMessages);

        // 4. prev,nextCursorId 업데이트
        setPrevCursorId(prevResp.data.data.newCursorId);
        setNextCursorId(nextResp.data.data.newCursorId);

        // 5. 초기 세팅 끝!
        setIsInitialized(true);
      } catch (error) {
        console.error("채팅 목록 불러오기 실패", error);
        setIsChatOpen();
        setAlertModal(true, "채팅 데이터 로드에 실패했습니다.", "fail");
      }
    };

    initializeChat();

    // 클린업 함수, 채팅방 언마운트시 마지막으로 읽은 메시지ID 업데이트
    return () => {
      updateLastReadMessageIdReq(principal.crewId).then((response) =>
        console.log(response)
      );
    };
  }, []);

  useEffect(() => {
    // 초기 세팅이 되지 않았을 경우, 이전 요청을 수행하고 있을 경우
    // 옵저버의 감지 막기
    // isLoading은 재렌더링을 예약할 뿐 실행중인 코드를 멈추진 않음
    // 근데 또 재렌더링 하기 전에 옵저버가 여서 콜백함수를 또 실행해버리면?
    // 무한.. => ref로 막기
    if (!isInitialized) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          prevCursorId !== null &&
          !isLoadingRef.current
        ) {
          // 요청 직전에 현재 DOM 요소의 높이 저장해두기
          prevScrollHeightRef.current = chatMainRef.current.scrollHeight;
          setIsLoading(true);
          isLoadingRef.current = true;

          const direction = "prev";

          getMessageListReq(principal.crewId, prevCursorId, direction, SIZE)
            .then((response) => {
              if (response.data.status === "failed") {
                setIsChatOpen();
                setAlertModal(true, response.data.message, "fail");
              }
              setPrevCursorId(response.data.data.newCursorId);
              const reversedMessages = response.data.data.messages.reverse();
              setMessages((prev) => [...reversedMessages, ...prev]);
            })
            .finally(() => {
              setIsLoading(false);
              isLoadingRef.current = false;
            });
        }
      },
      {
        root: chatMainRef.current,
        threshold: 0.0,
        rootMargin: "0px 0px 14px 0px",
      }
    );
    observer.observe(topObserver.current);
    return () => observer.disconnect();
  }, [prevCursorId, isInitialized, principal]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

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

            setMessages((prev) => [...prev, ...newMessages]);
          });
        }
      },
      {
        root: chatMainRef.current,
        threshold: 0.0,
        rootMargin: "14px 0px 0px 0px",
      }
    );
    observer.observe(bottomObserver.current);
    return () => observer.disconnect();
  }, [nextCursorId, isInitialized, principal]);

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
        chatMainRef.current.scrollHeight - prevScrollHeightRef.current;
      // chatMainRef의 스크롤을 높이 차만큼 더해주기 (최상단이 0이니까)
      chatMainRef.current.scrollTop = scrollOffset;
      prevScrollHeightRef.current = 0;
    }
  }, [messages, lastReadMessageRef]);

  return (
    <div css={s.chatMain(isLeaveConfirmOpen)} ref={chatMainRef}>
      <div ref={topObserver} css={s.observer} />
      {messages.map((message) => {
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
