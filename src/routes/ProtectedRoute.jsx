import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import { Suspense, useContext } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HomePageNavBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  );
};

export default ProtectedRoute;
