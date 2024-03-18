import React from "react";
import "./CurrentlyPlayingContent.scss";
import current_movie_logo from "../../assets/current_movie_logo.png";
import repeat from "../../assets/Repeat.png";
const CurrentlyPlayingContent = () => {
  return (
    <div className="currentlyPlayingContent">
      <img src={current_movie_logo} alt="" />

      <p className="movieDesctiption">
        Virupaksha is a 2023 Indian Telugu-language horror thriller film
        directed by Karthik Varma Dandu who co-wrote the film with Sukumar.
      </p>
      <div className="trendingContainer">
        <span className="top10">
          Top
          <br />
          10
        </span>
        <span className="trendingRank">
          #1 in Movies <br /> Today
        </span>
      </div>
      <div className="playBtnsWrapper">
        <button className="playBtn">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className="moreInfoBtn">
          <i className="fa-solid fa-circle-info"></i> More info
        </button>
      </div>
      <div className="filmCertification">
        <div className="imgWrapper">
          <img src={repeat} alt="" />
        </div>
        <div className="certification">U/A 13+</div>
      </div>
    </div>
  );
};

export default CurrentlyPlayingContent;
