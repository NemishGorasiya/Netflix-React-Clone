import React, { useEffect, useRef, useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";

const HomePageNavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
  const hamBurgerRef = useRef(null);
  const handleHamBurgerClick = () => {
    console.log("hamburger");
    console.log(isSideBarOpen);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navRight">
        <div
          className={
            isSideBarOpen ? "inputWrapper sideBarOpen" : "inputWrapper"
          }
        >
          <input type="search" name="" id="" />
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        </div>
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
