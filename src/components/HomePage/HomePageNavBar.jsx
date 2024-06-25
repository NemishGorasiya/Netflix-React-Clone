import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";
import { navbarLinks } from "../../constants/constants";

const HomePageNavBar = () => {
  const { pathname } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // To change navbar background from transparent to semi-transparent when scrolled 85px(can change) down
  const [scrolled, setScrolled] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);

  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 85);
  };

  useEffect(() => {
    // It makes sure that sidebar is not visible when screen viewport greater than 1140px
    const mediaWatcher = window.matchMedia("(min-width: 1140px)");
    const updateSideBarStatus = (e) => {
      if (e.matches) {
        setIsSideBarOpen(false);
      }
    };

    mediaWatcher.addEventListener("change", updateSideBarStatus);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mediaWatcher.removeEventListener("change", updateSideBarStatus);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = ({ target }) => {
    if (
      !sideBarRef.current?.contains(target) &&
      !hamBurgerRef.current?.contains(target)
    ) {
      setIsSideBarOpen(false);
      document.body.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isSideBarOpen);
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
            <img src={NetflixLogo} alt="Netflix logo" />
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
              className={({ isActive }) =>
                isActive ? "navLink activeLink" : "navLink"
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navRight">
        <button className={isSideBarOpen ? "sideBarOpen" : ""}>
          <Link to="/explore">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </Link>
        </button>
        <AccountSetting isSideBarOpen={isSideBarOpen} />
        <button
          ref={hamBurgerRef}
          className="hamburgerIcon"
          onClick={handleHamBurgerClick}
        >
          <i className={`fa-solid ${isSideBarOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>
    </div>
  );
};

export default HomePageNavBar;
