import { useState } from "react";
import useWS from "./hooks/useWS";
import api from "./utils/api";

// 3. 로그인하면 웹소켓활성화

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const [username, setUsername] = useState("");
  
  // 로그인하면 웹소켓 연결을 만들고 싶다
  // React 훅은 선언과 동시에 즉시 호출되어야 하며, 조건문이나 함수 내부에서 호출될 수 없다
  // React 훅은 선언과 초기화를 분리할 수 없고, 항상 컴포넌트의 최상위 레벨에서 호출되어야 한다

  // 훅 호출은 제어 불가능. 하지만 훅 내부에서 조건문을 통해 로직을 제어한다
  const socket = useWS(username?'/sub/echo3':null, (message)=>handleMessageReceived(message));
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
      setUsername(username);
      console.log(response);
    } catch(err) {
      console.log(err);
    } 
  }

  return (
    <div>
      Web Socket 연결 예제
      <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="메시지 입력 후 Enter" disabled={!username} />
      <textarea value={messages} readOnly rows={10} style={{ width: "100%", marginTop: "10px" }} />
      <button onClick={()=>login('spring')}>스프링 로그인</button>
      <button onClick={()=>login('summer')}>summer 로그인</button>
      <button onClick={()=>login('winter')}>윈터 로그인</button>
    </div>
  );
}

export default App;
