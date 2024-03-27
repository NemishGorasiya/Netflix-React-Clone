import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  return loggedInUser?.sessionID ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
