import { useCallback, useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { fetchMovies } from "../../services/services";
import { Link } from "react-router-dom";
const Slider = ({ changeCurrrentMovieData, isViewAll, moviesData = [] }) => {
  const sliderRef = useRef();
  const tempRef = useRef();
  const [isPrevBtnHidden, setIsPrevBtnHidden] = useState(true);
  const [isNextBtnHidden, setIsNextBtnHidden] = useState(false);
  let clientWidth = 0;
  let scrollLeft = 0;
  let scrollWidth = 0;
  const handleSliderBtnVisiblity = useCallback((scrollLeft) => {
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;
    // console.log("scrollWidth", scrollWidth);
    // console.log("clientWidth", clientWidth);
    // console.log("scrollLeft", scrollLeft);
    if (scrollLeft <= 0) {
      setIsPrevBtnHidden(true);
    } else {
      setIsPrevBtnHidden(false);
    }
    if (scrollLeft + clientWidth >= scrollWidth) {
      setIsNextBtnHidden(true);
    } else {
      setIsNextBtnHidden(false);
    }
  }, []);
  const handlePrevBtnClick = () => {
    scrollLeft = sliderRef.current.scrollLeft - sliderRef.current.clientWidth;
    handleSliderBtnVisiblity(scrollLeft);
    sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
  };
  const handleNextBtnClick = () => {
    scrollLeft = sliderRef.current.scrollLeft + sliderRef.current.clientWidth;
    handleSliderBtnVisiblity(scrollLeft);
    sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
  };
  let startX;
  let endX;
  const handleTouchStart = (event) => {
    startX = event.changedTouches[0].clientX;
  };
  const handleTouchEnd = (event) => {
    endX = event.changedTouches[0].clientX;
    if (startX - endX > 50) {
      handleNextBtnClick();
    } else if (startX - endX < -50) {
      handlePrevBtnClick();
    }
  };
  const handleDragStart = (event) => {
    startX = event.clientX;
  };
  const handleDragEnd = (event) => {
    endX = event.clientX;
    if (startX - endX > 50) {
      handleNextBtnClick();
    } else if (startX - endX < -50) {
      handlePrevBtnClick();
    }
  };
  useEffect(() => {
    if (isViewAll === false) {
      scrollLeft = sliderRef.current.scrollLeft;
      handleSliderBtnVisiblity(scrollLeft);
    }
  }, [isViewAll]);

  return (
    <div className={isViewAll ? "slider viewAll" : "slider"} ref={tempRef}>
      {!isViewAll && (
        <>
          {!isPrevBtnHidden && (
            <button className="sliderBtn prevBtn" onClick={handlePrevBtnClick}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}
          {!isNextBtnHidden && (
            <button className="sliderBtn nextBtn" onClick={handleNextBtnClick}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </>
      )}

      <div
        className="slideContainer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        ref={sliderRef}
      >
        {moviesData.map((movieData, idx) => (
          <div
            key={movieData.id}
            className="slide"
            onClick={() => {
              changeCurrrentMovieData(movieData);
            }}
          >
            <Link to={`/movies/moreInfo?id=${movieData.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                alt="image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
