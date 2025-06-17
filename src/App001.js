import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

// 1. 토스트 띄우기
// 2. 웹소켓 연결하기
// 3. 웹소켓 연결해 서버측 메시지 출력하기
// 4. 웹소켓 채팅하기
// 5. 귓말 보내기
// 6. 메모작성하면 메시지보내기

function App() {
  const [message, setMessage] = useState('');
  
  const show1 = ()=>{
    toast.success(message, { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, 
      draggable: true, progress: undefined, theme: "colored", transition: Slide });
  }

  const show2 = ()=>{
    toast.success(message, { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, 
      draggable: true, progress: undefined, theme: "dark", transition: Slide });
  }

  return (
    <div>
      <input onChange={e=>setMessage(e.target.value)} />
      <button onClick={show1}>colored</button>
      <button onClick={show2}>dark</button>
      <ToastContainer />
    </div>
  );
}

export default App;
