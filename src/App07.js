import { useState } from "react";
import useWS from "./hooks/useWS";
import api from "./utils/api";

// 1. WebSocket 세션은 HTTP 세션과 별개의 연결
// 2. HTTP 세션에 저장된 로그인 정보등을 웹소켓에서 활용하려면, 웹소켓 연결할 때 정보를 복사해와야한다
//    - HandshakeInterceptor를 이용해 HTTP 세션의 정보를 복사해올 수 있다
// 3. 스프링 + 스프링 시큐리티에서는 인증 정보를 컨트롤러에서 주입받을 수 있다
//    - 스프링 시큐리티가 웹소켓과의 통합을 지원해 메시징 컨트롤러 역시 인증정보를 주입받을 수 있다
// 4. 인증 정보는 웹소켓 연결이 이뤄질 때 한번 복사되며 갱신되지 않는다(별개의 연결)
//    - 로그인에 성공해도 여전히 GUEST, 화면을 갱신해야 연결이 새로 만들어지면서 로그인정보가 반영된다

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");

  const socket = useWS('/sub/echo3', (message)=>handleMessageReceived(message));
  const send = ()=>socket.current.publish({destination: "/pub/echo3", body: input});

  const handleMessageReceived = (msg) => {
    console.log(msg.body);
    setMessages((prev) => prev + (msg.body) + "\n");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      send();
      setInput("");
    }
  };

  const login=async(username)=>{
    const requestForm = {username:username, password:'1234'};
    try {
      const response = await api.post('/login', new URLSearchParams(requestForm));
      console.log(response);
    } catch(err) {
      console.log(err);
    } 
  }

  return (
    <div>
      Web Socket 연결 예제
      <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="메시지 입력 후 Enter" />
      <textarea value={messages} readOnly rows={10} style={{ width: "100%", marginTop: "10px" }} />
      <button onClick={()=>login('spring')}>스프링 로그인</button>
      <button onClick={()=>login('summer')}>summer 로그인</button>
      <button onClick={()=>login('winter')}>윈터 로그인</button>
    </div>
  );
}

export default App;
