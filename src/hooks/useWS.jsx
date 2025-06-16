import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react"
import SockJS from "sockjs-client";

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