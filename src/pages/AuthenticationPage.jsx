import AuthForm from "../components/WelcomePage/AuthForm.jsx";
import Footer from "../components/WelcomePage/Footer.jsx";
import NavBar from "../components/WelcomePage/NavBar.jsx";
import { AuthenticationPageFooterLinks } from "../data/data.jsx";
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
