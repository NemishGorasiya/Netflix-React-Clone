import NetflixLogo from "../assets/Netflix_logo.png";
import SelectLanguage from "./SelectLanguage";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logoImage" src={NetflixLogo} alt="" />
      </div>
      <div className="NavBtnWrapper">
        <SelectLanguage />
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;
