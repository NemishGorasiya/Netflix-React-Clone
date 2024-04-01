import { useEffect, useRef, useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";
import { Link, NavLink } from "react-router-dom";

const HomePageNavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);

  const handleHamBurgerClick = () => {
    // if (isSideBarOpen) {
    //   document.body.style.overflow = "auto";
    // } else {
    //   document.body.style.overflow = "hidden";
    // }
    setIsSideBarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // set initial value
    const mediaWatcher = window.matchMedia("(min-width: 1140px)");
    // setIsSideBarOpen(mediaWatcher.matches);

    //watch for updates
    function updateIsNarrowScreen(e) {
      if (e.matches) {
        setIsSideBarOpen(false);
      }
    }
    mediaWatcher.addEventListener("change", updateIsNarrowScreen);

    // clean up after ourselves
    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      sideBarRef.current &&
      hamBurgerRef.current &&
      !sideBarRef.current.contains(event.target) &&
      !hamBurgerRef.current.contains(event.target)
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
          <NavLink
            to="/home"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/tv"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            TV Shows
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            Movies
          </NavLink>
          <NavLink
            to="/myWatchList"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            My WatchList
          </NavLink>
          <NavLink
            to="/myFavorite"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            My Favorite
          </NavLink>
          <NavLink
            to="/rated"
            className={({ isActive }) => {
              return isActive ? "navLink activeLink" : "navLink";
            }}
          >
            My Rated
          </NavLink>
        </ul>
      </div>
      <div className="navRight">
        <button
          className={isSideBarOpen ? "seachBtn sideBarOpen" : "searchBtn"}
        >
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
