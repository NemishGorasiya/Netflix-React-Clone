import { useEffect, useState } from "react";
import "./CurrentlyPlayingContent.scss";
import repeat from "../../assets/Repeat.png";
import Button from "../../UI/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CurrentlyPlayingContentSkeleton from "./CurrentlyPlayingContentSkeleton";
import RenderIfVisible from "react-render-if-visible";
import DisplayMovie from "./DisplayMovie";

const CurrentlyPlayingContent = ({
  displayMoviesData,
  mediaType,
  isLoading,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCount((prevCount) =>
        prevCount + 1 === displayMoviesData.length ? 0 : prevCount + 1
      );
    }, 4000);
    return () => {
      clearInterval(myInterval);
    };
  }, [count, displayMoviesData]);

  return (
    <div className="displayMoviesContainer">
      {isLoading && <CurrentlyPlayingContentSkeleton />}
      {!isLoading &&
        displayMoviesData &&
        displayMoviesData.map((displayMovie) => (
          <DisplayMovie
            key={displayMovie.id}
            count={count}
            displayMovie={displayMovie}
            mediaType={mediaType}
          />
        ))}
    </div>
  );
};

CurrentlyPlayingContent.propTypes = {
  displayMoviesData: PropTypes.array,
  mediaType: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CurrentlyPlayingContent;
