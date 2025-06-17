import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

function App() {
  // State vs Ref
  // UI관련으로 재렌더링되는 상태 vs 렌더링과 무관한 상태(웹소켓, setInterval ID, DOM 요소)
  const socket = useRef(null);

  // 즉시 평가 가능한 초기화
  const [value, setValue] = useState(10);
  const num = useRef(10);

  // 비동기 작업이나 외부 리소스를 필요로 하는 초기화는 useEffect
  useEffect(()=>{
    const client = new Client({
      reconnectDelay:5000,
      webSocketFactory:()=>new SockJS('http://localhost:8080/ws'),
      onConnect:()=>{
        console.log("===== 서버 접속 =====");
        client.subscribe('/sub/noti2', (message)=>{console.log(message.body)})
      }
    });
    client.activate();
    socket.current = client;

    // 선택: 컴포넌트 언마운트 시 연결 해제
    return ()=>{
      console.log("===== 리소스 해제 =====");
      socket.current.deactivate();
    }
  }, []);

  return (
    <div>
      <div>{value}</div>
      <button onClick={()=>setValue(prev=>prev+1)}>+</button>
    </div>
  )
}

export default App