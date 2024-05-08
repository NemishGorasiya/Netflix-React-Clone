import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import { Suspense } from "react";
import Loader from "../components/Loader";

const ProtectedRoute = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  return loggedInUser?.sessionID ? (
    <>
      <HomePageNavBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
