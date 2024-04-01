import AuthForm from "../components/OverViewPage/AuthForm.jsx";
import Footer from "../components/OverViewPage/Footer.jsx";
import NavBar from "../components/OverViewPage/NavBar.jsx";
import { AuthenticationPagefooterLinks } from "../data/data.js";
import "./AuthenticationPage.scss";

const AuthenticationPage = () => {
  return (
    <div className="authenticationPage">
      <NavBar />
      <AuthForm />
      <div className="footerWrapper">
        <Footer
          style={{
            width: "80%",
            margin: "auto",
          }}
          footerLinks={AuthenticationPagefooterLinks}
        />
      </div>
    </div>
  );
};

export default AuthenticationPage;
