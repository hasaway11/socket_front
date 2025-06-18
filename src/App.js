import { Route, Routes, useLocation } from "react-router-dom";
import useAppStore from "./stores/useAppStore";
import { useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import User from "./pages/User.jsx";
import Hospital from "./pages/Hospital.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import UserRoute from "./routes/UserRoute.jsx";
import HospitalRoute from "./routes/HospitalRoute.jsx";
import Nav from "./fragments/Nav.jsx";

function App() {
  const location = useLocation();
  const {checkAuth, socket} = useAppStore();

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

  return (
    <>
      <Nav />
      <hr />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/private" element={<PrivateRoute element={<Private/>} />} />
        <Route path="/user" element={<UserRoute element={<User />} />} />
        <Route path="/hospital" element={<HospitalRoute element={<Hospital />} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
