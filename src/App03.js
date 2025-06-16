import { Client } from "@stomp/stompjs";
import { useEffect, useRef} from "react";
import SockJS from "sockjs-client";

// 3. 웹소켓 수신하기

function App() {
  const socket = useRef(null);
  const subUrl = '/sub/noti';

   useEffect(()=>{
    const client = new Client({
      webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        client.subscribe(subUrl, (message) => console.log(message.body));
      },
    });
    client.activate();
    socket.current = client;
    return () => {
      client.deactivate(); // ✅ 정리
    };
  },[])

  return (
    <div>
      Web Socket 수신 예제
    </div>
  );
}

export default App;
