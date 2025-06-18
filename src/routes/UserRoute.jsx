import { Navigate } from 'react-router-dom';
import useAppStore from '../stores/useAppStore';

function UserRoute({ element }) {
  const {username, role} = useAppStore();

  if (username===undefined) return; 
  if (username===null) return <Navigate to="/login" replace />;
  if (role!=='ROLE_USER') return <Navigate to="/" replace />;
  return element;
};

export default UserRoute