import useAppStore from '../stores/useAppStore';
import { Navigate } from 'react-router-dom';

function PublicRoute({ element }) {
  const { username} = useAppStore();
  return username ? <Navigate to="/" replace /> : element;
};

export default PublicRoute