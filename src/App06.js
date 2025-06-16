import { useState } from "react";
import useWS from "./hooks/useWS";

// 3. 웹소켓으로 서버 메시지 수신하기

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");

  const socket = useWS('/sub/echo2', (message)=>handleMessageReceived(message));
  const send = ()=>socket.current.publish({destination: "/pub/echo2", body: input});

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

  // 비로그인 기반이므로 Principal은 모두 null. 창을 3개 열었다면 한 사용자가 웹소켓 세션 3개를 가졌다고 해석된다
  return (
    <div>
      <h1>Web Socket 연결 예제</h1>
      <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="메시지 입력 후 Enter" />
      <textarea value={messages} readOnly rows={10} style={{ width: "100%", marginTop: "10px" }} />
    </div>
  );
}

export default App;
