import React, { useState } from "react";
import "./CurrentlyPlayingContent.scss";
import current_movie_logo from "../../assets/current_movie_logo.png";
import repeat from "../../assets/Repeat.png";
import Button from "../../UI/Button";
import { Link, useSearchParams } from "react-router-dom";
const CurrentlyPlayingContent = ({ currentMovieData }) => {
  return (
    <div
      className="currentlyPlayingContent"
      style={{
        background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${currentMovieData.backdrop_path}")`,
      }}
    >
      <h1 className="movieTitle">{currentMovieData.original_title}</h1>

      <p className="movieDesctiption">{currentMovieData.overview}</p>
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
        <Button
          className={"btn playBtn"}
          iconClassName={"fa-solid fa-play"}
          text={"Play"}
          style={{ marginRight: "10px" }}
        />
        <Link to={`/movies/moreInfo?id=${currentMovieData.id}`}>
          <Button
            className={"btn moreInfoBtn"}
            iconClassName={"fa-solid fa-circle-info"}
            text={"More Info"}
          />
        </Link>
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
