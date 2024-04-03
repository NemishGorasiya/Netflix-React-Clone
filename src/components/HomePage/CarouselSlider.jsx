import { useEffect, useState } from "react";
import "./CarouselSlider.scss";
import PropTypes from "prop-types";
import CarouselSliderSkeleton from "./CarouselSliderSkeleton";
import CarouselSlide from "./CarouselSlide";

const CarouselSlider = ({ displayMoviesData, mediaType, isLoading }) => {
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
        <CarouselSliderSkeleton />
      ) : (
        displayMoviesData &&
        displayMoviesData.map((displayMovie) => (
          <CarouselSlide
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

CarouselSlider.propTypes = {
  displayMoviesData: PropTypes.array,
  mediaType: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CarouselSlider;
