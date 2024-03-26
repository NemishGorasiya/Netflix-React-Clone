import React, { useEffect, useRef, useState } from "react";
import "./CurrentlyPlayingContent.scss";
import repeat from "../../assets/Repeat.png";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";

const CurrentlyPlayingContent = ({ displayMoviesData }) => {
  const displayMoviesContainerRef = useRef(null);
  useEffect(() => {
    const myInterval = setInterval(() => {
      const style = window.getComputedStyle(displayMoviesContainerRef.current);
      console.log(parseFloat(style.width));
      const scrollWidth = displayMoviesContainerRef.current.scrollWidth;
      const offsetWidth = displayMoviesContainerRef.current.offsetWidth;
      const scrollLeft = displayMoviesContainerRef.current.scrollLeft; 
      if (scrollLeft + offsetWidth >= scrollWidth) {
        displayMoviesContainerRef.current.scrollLeft = 0;
      } else {
        displayMoviesContainerRef.current.scrollLeft += displayMoviesContainerRef.current.offsetWidth;
      }
    }, 4000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    const displayMoviesContainer = displayMoviesContainerRef.current;
    window.addEventListener("resize", () => {
      displayMoviesContainer.scrollLeft = 0;
    });
    return () => {
      window.addEventListener("resize", () => {
        displayMoviesContainer.scrollLeft = 0;
      });
    };
  }, []);
  return (
    <div className="displayMoviesContainer" ref={displayMoviesContainerRef}>
      {displayMoviesData.map((displayMovie) => (
        <div
          key={displayMovie.id}
          className="currentlyPlayingContent"
          style={{
            background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${displayMovie.backdrop_path}")`,
          }}
        >
          <h1 className="movieTitle">{displayMovie.original_title}</h1>

          <p className="movieDesctiption" title={displayMovie.overview}>
            {displayMovie.overview}
          </p>
          {/* <div className="trendingContainer">
            <span className="top10">
              Top
              <br />
              10
            </span>
            <span className="trendingRank">
              #1 in Movies <br /> Today
            </span>
          </div> */}
          <div className="playBtnsWrapper">
            <Button
              className={"btn playBtn"}
              iconClassName={"fa-solid fa-play"}
              text={"Play"}
              style={{ marginRight: "10px" }}
            />
            <Link to={`/movies/moreInfo?id=${displayMovie.id}`}>
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
      ))}
    </div>
  );
};

export default CurrentlyPlayingContent;
