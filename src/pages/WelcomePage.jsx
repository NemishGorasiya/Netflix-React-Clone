import { Navigate } from "react-router-dom";
import Hero from "../components/WelcomePage/Hero";
import MoreDetails from "../components/WelcomePage/MoreDetails";
import useLocalStorage from "../hooks/useLocalStorage";

const WelcomePage = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
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
