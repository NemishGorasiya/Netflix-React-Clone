import { useEffect, useState } from "react";
import "./CurrentlyPlayingContent.scss";
import PropTypes from "prop-types";
import CurrentlyPlayingContentSkeleton from "./CurrentlyPlayingContentSkeleton";
import CarouselSlider from "./CarouselSlider";

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
      {isLoading ? (
        <CurrentlyPlayingContentSkeleton />
      ) : (
        displayMoviesData &&
        displayMoviesData.map((displayMovie) => (
          <CarouselSlider
            key={displayMovie.id}
            count={count}
            displayMovie={displayMovie}
            mediaType={mediaType}
          />
        ))
      )}
    </div>
  );
};

CurrentlyPlayingContent.propTypes = {
  displayMoviesData: PropTypes.array,
  mediaType: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CurrentlyPlayingContent;
