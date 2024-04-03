import AuthForm from "../components/OverViewPage/AuthForm.jsx";
import Footer from "../components/OverViewPage/Footer.jsx";
import NavBar from "../components/OverViewPage/NavBar.jsx";
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
