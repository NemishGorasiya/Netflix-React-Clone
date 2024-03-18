import React from "react";
import "./HomePageNavBar.scss";
import NetflixLogo from "../../assets/Netflix_logo.png";

const HomePageNavBar = () => {
  return (
    <div className="homePageNavBar">
      <div className="navLeft">
        <div className="logoContainer">
          <img src={NetflixLogo} alt="" />
        </div>
        <ul className="navLinks">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div>
        <input type="search" name="" id="" />
        <button>notification</button>
        <select name="" id="">
          <option value="">Profile</option>
        </select>
      </div>
    </div>
  );
};

export default HomePageNavBar;
