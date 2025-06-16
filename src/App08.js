import { Route, Routes, useLocation } from "react-router-dom";
import useAppStore from "./stores/useAppStore";
import Test1 from './pages/Test1'
import Test2 from './pages/Test2'
import { useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import api from './utils/api.js';

function App() {
  const location = useLocation();
  const {checkAuth, username, setLogin, socket} = useAppStore();

  useEffect(()=>{
    checkAuth();
  }, [location]);

  useEffect(() => {
    if (!socket) return;
     const subscription = socket.subscribe('/user/sub/echo4', (message) => {
      toast.success("메시지가 도착했습니다", { position: "top-right", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", transition: Slide });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [socket]);

  const login=async(username)=>{
    const requestForm = {username:username, password:'1234'};
    try {
      const response = await api.post('/login', new URLSearchParams(requestForm));
      setLogin(username);
      console.log(response);
    } catch(err) {
      console.log(err);
    } 
  }  

  return (
    <>
      <Routes>
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
      <hr />
      <div>
        <button onClick={()=>login('spring')} disabled={username && username!=='spring'}>스프링 로그인</button>
        <button onClick={()=>login('summer')} disabled={username && username!=='summer'}>summer 로그인</button>
        <button onClick={()=>login('winter')} disabled={username && username!=='winter'}>윈터 로그인</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
