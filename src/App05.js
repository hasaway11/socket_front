import { useState } from "react";
import useWS from "./hooks/useWS";

// 2. 웹소켓 연결하고 통신하기

function App() {
  const [input, setInput] = useState('');

  const socket = useWS('/sub/echo2', (message)=>console.log(message.body));
  // const send = ()=>socket.current.publish({destination: "/pub/echo2", body: "안녕하세요"});
  const send = ()=> {
    socket.current.publish({destination: "/pub/echo2", body: input});
    setInput("");
  }

  return (
    <div>
      <h1>Web Socket 연결 예제</h1>
      <input onChange={e=>setInput(e.target.value)} value={input} />
      <button onClick={send}>보내기</button>
    </div>
  );
}

export default App;
