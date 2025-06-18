import useAppStore from "../stores/useAppStore";
import api from "../utils/api";

function Login() {
  const {setLogin, username} = useAppStore();

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
    <div>
      <button onClick={()=>login('spring')} disabled={username && username!=='spring'}>스프링 로그인</button>
      <button onClick={()=>login('summer')} disabled={username && username!=='summer'}>summer 로그인</button>
      <button onClick={()=>login('winter')} disabled={username && username!=='winter'}>윈터 로그인</button>
    </div>
  )
}

export default Login