import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; //WebSocket 연결 엔드포인트
const PUB_ENDPOINT = "/pub/crew/"; // 메시지를 전송하기 위한 엔드포인트
const SUB_ENDPOINT = "/sub/crew/"; // 메시지를 수신하기 위한 엔드포인트

let client = null;
let subscription = null; // /sub/crew/{crewId}

//서버 연결 활성화
export const connectStomp = (crewId, onSubscribeCallback) => {
  if (client && client.active) return;

  client = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000, //연결 끊기면 자동으로 5초 후 재시도
    onConnect: () => {
      if (!client || !client.connected) return;

      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }

      //구독
      subscription = client.subscribe(SUB_ENDPOINT + crewId, (message) => {
        const payload = JSON.parse(message.body); //GetMessageRespDto
        if (payload) onSubscribeCallback(payload);
      });
    },
    // onStompError: (frame) => {
    //   console.error("STOMP 에러:", frame.headers["message"], frame.body);
    // },
  });

  client.activate();
};


//발행
export const publishStomp = (crewId, data) => {
  if (!client || !client.connected || !subscription) {
    return;
  }

  client.publish({
    destination: PUB_ENDPOINT + crewId,
    body: JSON.stringify(data), //SaveMessageReqDto
  });
};

//서버 연결 비활성화
export const disconnectStomp = () => {
  //구독취소
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
  //연결제거
  if (client) {
    client.deactivate();
    client = null;
  }
};
