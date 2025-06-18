import { Link } from "react-router-dom";
import { logout } from "../utils/authApi";
import useAppStore from "../stores/useAppStore";

function Nav() {
  const {username, role, setLogout}  = useAppStore();

  const doLogout=async (e)=>{
    e.preventDefault();
    try {
      await logout();
      setLogout();
    } catch(err) {
      console.log(err);
    }
  }

  if(!username) {
    return (
      <nav>
        <div>비로그인</div>
        <ul>
          <li><Link to={"/"}>HOME</Link></li>
          <li><Link to={"/login"}>로그인</Link></li>
        </ul>
      </nav>
    )
  } else {
    if(role==='ROLE_USER') {
      return (
        <nav>
          <div>{username} 권한:{role}</div>
          <ul>
            <li><Link to={"/"}>HOME</Link></li>
            <li><Link to={"/private"}>private(로그인 접근 가능)</Link></li>
            <li><Link to={"/user"}>유저 접근 가능</Link></li>
             <li><Link to={"#"} onClick={doLogout}>로그아웃</Link></li>
          </ul>
      </nav>
      )
    } else if(role==='ROLE_HOSPITAL') {
      return (
        <nav>
          <div>{username} 권한:{role}</div>
          <ul>
            <li><Link to={"/"}>HOME</Link></li>
            <li><Link to={"/private"}>private(로그인 접근 가능)</Link></li>
            <li><Link to={"/hospital"}>병원 접근 가능</Link></li>
            <li><Link to={"#"} onClick={doLogout}>로그아웃</Link></li>
          </ul>
        </nav>
      )
    }
  
  }
}

export default Nav