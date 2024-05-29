import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import Loader from "../components/common/Loader";

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
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  );
};

export default ProtectedRoute;
