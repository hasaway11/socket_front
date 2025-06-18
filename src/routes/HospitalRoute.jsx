import { Navigate } from "react-router-dom";
import useAppStore from "../stores/useAppStore";

function HospitalRoute({ element }) {
  const {username, role} = useAppStore();
  if (username===undefined) return; 
  if (username===null) return <Navigate to="/login" replace />;
  if (role!=='ROLE_HOSPITAL') return <Navigate to="/" replace />;
  return element;
}

export default HospitalRoute