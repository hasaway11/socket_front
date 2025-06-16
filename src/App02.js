import { Client } from "@stomp/stompjs";
import { useEffect, useRef} from "react";
import SockJS from "sockjs-client";

// 2. 웹소켓 연결하기

function App() {
  const socket = useRef(null);
  const subUrl = '/sub/echo1';
  const handler = (message)=>console.log(message);

  // useEffect는 side effect를 처리하는 훅(API 호출, DOM 조작, 이벤트 리스너 등록. 즉 웹소켓 연결 등 외부 시스템과의 상호 작용도)
  useEffect(()=>{
    console.log("fire");
    const client = new Client({
      // 백엔드에 연결해 웹소켓 또는 SockJS 객체를 리턴하는 함수 
      webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
      // 서버에 연결되었을 때의 실행할 콜백
      onConnect: () => {
        console.log('✅ WebSocket 연결됨');
        // 구독 설정
        // 서버의 /sub/echo1 응답은 @MessageMapping에 걸려있으므로 응답이 수신되지 않는다
        // stompClient.publish({ destination: "/pub/echo", body: "hello" });
        client.subscribe(subUrl, (message) => handler(message));
      },
    });
    // 설정 객체를 가지고 실제 연결 시작
    client.activate();
    socket.current = client;

    // 선택: 컴포넌트 언마운트 시 연결 해제
    return () => {
      client.deactivate(); // ✅ 정리
    };
  },[])

  return (
    <div>
      Web Socket 연결 예제
    </div>
  );
}

export default App;
