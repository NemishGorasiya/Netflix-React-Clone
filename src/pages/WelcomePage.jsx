import { Navigate } from "react-router-dom";
import Hero from "../components/WelcomePage/Hero";
import MoreDetails from "../components/WelcomePage/MoreDetails";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const WelcomePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="welcomePage">
      <Hero />
      <MoreDetails />
    </div>
  );
};

export default WelcomePage;
