import { useState } from "react";
import api from "../utils/api";

function Test1() {
  const [receiver, setReceiver] = useState('');

  const handleChange=(e)=>setReceiver(e.target.value);

  const handleSend=async()=>{
    const message = {receiver:receiver, text:"까꿍"};
    console.log(message);
    try {
      await api.post('http://localhost:8080/api/messages', new URLSearchParams(message));
      console.log("send")
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option>spring</option>
        <option>summer</option>
        <option>winter</option>
      </select>    
      <button onClick={handleSend}>보내기</button>
    </div>
  )
}

export default Test1