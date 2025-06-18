import { Navigate } from "react-router-dom";
import useAppStore from "../stores/useAppStore";

const PrivateRoute = ({ element }) => {
  const username = useAppStore(state=>state.username);

  if (username === undefined) 
    return; 

  return username ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;