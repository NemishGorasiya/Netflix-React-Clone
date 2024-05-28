import React from "react";
import NavBar from "../components/WelcomePage/NavBar.jsx";
import AuthForm from "../components/WelcomePage/AuthForm.jsx";
import Footer from "../components/WelcomePage/Footer.jsx";
import { AuthenticationPageFooterLinks } from "../constants/constants.js";
import "./AuthenticationPage.scss";

const AuthenticationPage = () => {
	return (
		<div className="authenticationPage">
			<NavBar />
			<AuthForm />
			<div className="footerWrapper">
				<Footer footerLinks={AuthenticationPageFooterLinks} />
			</div>
		</div>
	);
};

export default AuthenticationPage;
