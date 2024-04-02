import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";

const ProtectedRoute = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  return loggedInUser?.sessionID ? (
    <>
      <HomePageNavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
