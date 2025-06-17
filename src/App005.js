import { Client } from "@stomp/stompjs";
import { useEffect, useRef} from "react";
import SockJS from "sockjs-client";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

// 4. 웹소켓 수신하기

function App() {
  const socket = useRef(null);
  const subUrl = '/sub/noti2';
  const show = (msg)=>{
    toast.success(msg, { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, 
      draggable: true, progress: undefined, theme: "colored", transition: Slide });
  }

   useEffect(()=>{
    const client = new Client({
      webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        client.subscribe(subUrl, (message) => {
          const [sender] = message.body.split(":");
          // const msg = `${arr[1]}에 ${arr[0]}님의 메시지 도착`;
          show(
            <div>
              <div>{sender}님의 메시지 도착</div>
              <div><Link to="/read">👉 읽기</Link></div>
            </div>
          );
        });
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
      <ToastContainer />
    </div>
  );
}

export default App;
