import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Hero from "../components/WelcomePage/Hero";
import MoreDetails from "../components/WelcomePage/MoreDetails";

const WelcomePage = () => {
	const { isLoggedIn } = useContext(AuthContext);

	if (isLoggedIn) {
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
