import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

function PrivatePage() {
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
      <Link to='/'>루트페이지로</Link>
      <br/>
      <select onChange={handleChange}>
        <option>spring</option>
        <option>summer</option>
        <option>winter</option>
      </select>    
      <button onClick={handleSend}>보내기</button>
    </div>
  )
}

export default PrivatePage