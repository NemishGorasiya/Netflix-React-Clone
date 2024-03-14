import NetflixLogo from "../assets/Netflix_logo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logoImage" src={NetflixLogo} alt="" />
      </div>
      <div className="NavBtnWrapper">
        <div className="selectLanguage">
          <select name="" id="">
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default NavBar;
