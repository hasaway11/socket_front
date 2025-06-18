import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

// 1. 토스트 띄우기

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
