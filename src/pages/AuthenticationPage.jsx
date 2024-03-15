import AuthForm from "../components/AuthForm.jsx";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar.jsx";
import { AuthenticationPagefooterLinks } from "../data/data.js";
import "./AuthenticationPage.scss";

const AuthenticationPage = () => {
  return (
    <div className="authenticationPage">
      <NavBar />
      <AuthForm />
      <Footer footerLinks={AuthenticationPagefooterLinks} />
    </div>
  );
};

export default AuthenticationPage;
