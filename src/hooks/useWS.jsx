import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react"
import SockJS from "sockjs-client";

// 1. 커스텀 훅 : 리액트 훅을 사용해서 만든 재사용 가능한 모듈로 use로 시작하는 이름을 가진다
// 2. 커스텀 훅은 컴포넌트 함수 또는 다른 커스텀 훅 내부에서만 호출해야 한다
// 3. 조건문이나 루프 안에서 호출하면 안된다
//    로그인했으면 훅을 생성해라(X) -> 훅 내부에서 비로그인이면 return해라

function useWS(subUrl, handler) {
  const socket = useRef(null);

  useEffect(()=>{
    // subUrl 없으면 연결 안 함 (로그인 전)
    if(!subUrl) return;

    console.log(subUrl);

    const client = new Client({
      reconnectDelay: 5000,
      webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
      onConnect:()=>{
        console.log("웹 소켓 연결");
        client.subscribe(subUrl, message=>handler(message));
      }
    });
    client.activate();
    socket.current = client;
  },[subUrl]);

  return socket;
}

export default useWS