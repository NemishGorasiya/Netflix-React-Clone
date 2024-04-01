import { Navigate } from "react-router-dom";
import Hero from "../components/OverViewPage/Hero";
import MoreDetails from "../components/OverViewPage/MoreDetails";
import useLocalStorage from "../hooks/useLocalStorage";

const OverviewPage = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  if (loggedInUser) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="overViewPage">
      <Hero />
      <MoreDetails />
    </div>
  );
};

export default OverviewPage;
