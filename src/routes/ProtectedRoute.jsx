import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import Loader from "../components/common/Loader";
import useScrollToTop from "../hooks/useScrollToTop";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  useScrollToTop();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HomePageNavBar />
      <Suspense fallback={<Loader atCenter />}>
        <Outlet />
      </Suspense>
      <ScrollRestoration getKey={(location) => location.pathname} />
    </>
  );
};

export default ProtectedRoute;
