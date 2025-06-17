import { useState } from "react";
import useWS from "./hooks/useWS";
import api from "./utils/api";
import { Slide, toast, ToastContainer } from "react-toastify";

// 메모를 보냈다치고...메시지가 전달된다

function App() {
  const [input, setInput] = useState({receiver:'', text:''});
  const [username, setUsername] = useState("");
  
  const socket = useWS(username?`/user/sub/echo4`:null, ()=>{
    console.log("fire");
    toast.success("메시지가 도착했습니다", { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", transition: Slide });
  });

  const handleSend=async()=>{
    const message = {receiver:input.receiver, text:input.text};
    console.log(message);
    try {
      await api.post('http://localhost:8080/api/messages', new URLSearchParams(message))
    } catch(err) {
      console.log(err);
    }
    setInput({receiver:'', text:''})
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput(prev=>({...prev, [name]:value}))
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
      <h1>Web Socket 연결 예제</h1>
      <h2>{username}</h2>
      <div className='mb-3 mt-3'>
        <label htmlFor='receiver' className="form-label">받는이:</label>
        <input className='form-control' onChange={handleChange} placeholder="받는이 입력" disabled={!username} name='receiver' value={input.receiver}/>
      </div>
      <div className='mb-3 mt-3'>
        <label htmlFor='text' className="form-label">받는이:</label>
        <textarea className='form-control' rows={5} onChange={handleChange} name='text' value={input.text}></textarea>
      </div>
      <div className='mb-3 mt-3'>
        <button className="btn btn-primary" onClick={handleSend} disabled={!username}>보내기</button>
      </div>
      <button onClick={()=>login('spring')} disabled={username && username!=='spring'}>스프링 로그인</button>
      <button onClick={()=>login('summer')} disabled={username && username!=='summer'}>summer 로그인</button>
      <button onClick={()=>login('winter')} disabled={username && username!=='winter'}>윈터 로그인</button>
      <hr />
      <ToastContainer />
    </div>
  );
}

export default App;
