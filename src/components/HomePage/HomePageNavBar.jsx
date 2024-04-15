import { useEffect, useRef, useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/constants";

const HomePageNavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);

  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(min-width: 1140px)");
    function updateSideBarStatus(e) {
      if (e.matches) {
        setIsSideBarOpen(false);
      }
    }
    mediaWatcher.addEventListener("change", updateSideBarStatus);
    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateSideBarStatus);
    };
  }, []);

  const handleClickOutside = ({ target }) => {
    if (
      sideBarRef.current &&
      hamBurgerRef.current &&
      !sideBarRef.current.contains(target) &&
      !hamBurgerRef.current.contains(target)
    ) {
      setIsSideBarOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    if (!isSideBarOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);
  return (
    <div className="homePageNavBar">
      <div className={isSideBarOpen ? "overLay sideBarOpen" : "overLay"}></div>
      <div className="navLeft">
        <div className="logoContainer">
          <img src={NetflixLogo} alt="Netflix" />
        </div>
        <ul
          ref={sideBarRef}
          className={isSideBarOpen ? "navLinks sideBarOpen" : "navLinks"}
        >
          {navbarLinks.map(({ link, label }) => (
            <NavLink
              key={link}
              to={`/${link}`}
              className={({ isActive }) => {
                return isActive ? "navLink activeLink" : "navLink";
              }}
            >
              {label}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navRight">
        <button className={isSideBarOpen ? "sideBarOpen" : ""}>
          <Link to={"/explore"}>
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </Link>
        </button>
        <button
          className={
            isSideBarOpen ? "notificationBtn sideBarOpen" : "notificationBtn"
          }
        >
          <i className="fa-solid fa-bell notificationIcon"></i>
        </button>
        <AccountSetting isSideBarOpen={isSideBarOpen} />
        <button
          ref={hamBurgerRef}
          className="hamburgerIcon"
          onClick={handleHamBurgerClick}
        >
          <i
            className={`fa-solid ${isSideBarOpen ? "fa-xmark" : "fa-bars"}`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default HomePageNavBar;
