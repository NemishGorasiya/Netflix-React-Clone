import NetflixLogo from "../assets/Netflix_logo.png";
import SelectLanguage from "./SelectLanguage";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logoImage" src={NetflixLogo} alt="Netflix" />
      </div>
      <div className="NavBtnWrapper">
        <SelectLanguage />
        <Link to="auth?mode=login">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
