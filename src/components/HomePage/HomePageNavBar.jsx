import React, { useState } from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";
import AccountSetting from "./AccountSetting";

const HomePageNavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleHamBurgerClick = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };
  return (
    <div className="homePageNavBar">
      <div className="navLeft">
        <div className="logoContainer">
          <img src={NetflixLogo} alt="" />
        </div>
        <ul className={isSideBarOpen ? "navLinks sideBarOpen" : "navLinks"}>
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
        <button className="hamburgerIcon" onClick={handleHamBurgerClick}>
          <i
            className={`fa-solid ${isSideBarOpen ? "fa-xmark" : "fa-bars"}`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default HomePageNavBar;
