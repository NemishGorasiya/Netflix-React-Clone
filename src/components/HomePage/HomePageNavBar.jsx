import { useEffect, useRef, useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navbarLinks } from "../../constants/constants";

const HomePageNavBar = () => {
  const { pathname } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 85) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(min-width: 1140px)");
    function updateSideBarStatus(e) {
      if (e.matches) {
        setIsSideBarOpen(false);
      }
    }
    mediaWatcher.addEventListener("change", updateSideBarStatus);
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateSideBarStatus);
      window.removeEventListener("scroll", handleScroll);
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
      document.body.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  return (
    <div
      className={`homePageNavBar ${
        pathname.startsWith("/explore") ? "navbar-black" : ""
      } ${scrolled ? "semiTransparent" : ""}`}
    >
      <div className={isSideBarOpen ? "overLay sideBarOpen" : "overLay"}></div>
      <div className="navLeft">
        <div className="logoContainer">
          <Link to="/home">
            <img src={NetflixLogo} alt="Netflix" />
          </Link>
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
