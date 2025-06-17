import { Client } from "@stomp/stompjs";
import { useState } from "react";
import SockJS from "sockjs-client";

function App() {
  // 웹소켓 연결은 브라우저의 개별 탭 또는 창 단위로 유지
  // - 페이지가 새로 고침되거나 다른 페이지로 이동하거나, 탭을 닫으면 끊어진다

  
  // 컴포넌트내 로컬 변수이므로 클라이언트측은 항상 소켓이 1개
  // - 재렌더링될 때마다 웹소켓이 새로 생성되고, 기존 소켓은 버려진다
  // - 서버는 연결이 끊어진 웹소켓을 계속 유지 -> 귀중한 웹소켓 연결이 낭비된다
  let socket = null;
  const [value, setValue] = useState(1);

  socket = new Client({
    webSocketFactory:()=>new SockJS('http://localhost:8080/ws'),
    onConnect:()=>{
      console.log("====서버 연결=====");
      socket.subscribe('/sub/noti2', (message)=>{console.log(message.body)})
    }
  });
  socket.activate();

  return (
    <div>
      <div>{value}</div>
      <button onClick={()=>setValue(prev=>prev+1)}>+</button>
    </div>
  )
}

export default App