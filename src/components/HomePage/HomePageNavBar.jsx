import React, { useEffect, useRef, useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";
import { Link } from "react-router-dom";

const HomePageNavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);

  const handleHamBurgerClick = () => {
    if (isSideBarOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    setIsSideBarOpen((prevState) => !prevState);
  };

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
          <img src={NetflixLogo} alt="" />
        </div>
        <ul
          ref={sideBarRef}
          className={isSideBarOpen ? "navLinks sideBarOpen" : "navLinks"}
        >
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/tv"}>
            <li>TV Shows</li>
          </Link>
          <Link to={"/movies"}>
            <li>Movies</li>
          </Link>
          <li>New & Popular</li>
          <Link to={"/myWatchList"}>
            <li>My WatchList</li>
          </Link>
          <Link to={"/myFavorite"}>
            <li>My Favorite</li>
          </Link>
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
