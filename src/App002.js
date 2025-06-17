import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 웹소켓 연결하기

function App() {
  let socket = null;

  socket = new Client({
    webSocketFactory:()=>new SockJS('http://localhost:8080/ws'),
    onConnect:()=>{
      socket.subscribe('/sub/noti2', (message)=>{console.log(message.body)})
    }
  });
  socket.activate();

  return (
    <div>App</div>
  )
}

export default App