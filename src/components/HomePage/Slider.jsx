import { useRef, useState } from "react";
import "./Slider.scss";
import { fetchMovies } from "../../utils/http";
const Slider = ({ changeCurrrentMovieData, isViewAll, moviesData = [] }) => {
  // fetchMovies();
  const sliderRef = useRef();
  const tempRef = useRef();
  const [isPrevBtnHidden, setIsPrevBtnHidden] = useState(true);
  const [isNextBtnHidden, setIsNextBtnHidden] = useState(false);
  let clientWidth = 0;
  let scrollLeft = 0;
  let scrollWidth = 0;
  const handlePrevBtnClick = () => {
    const calcToScroll = (sliderRef.current.clientWidth - 60) / 9;
    clientWidth = sliderRef.current.clientWidth;
    scrollLeft = sliderRef.current.scrollLeft;
    if (isNextBtnHidden) {
      setIsNextBtnHidden(false);
    }
    if (clientWidth >= scrollLeft) {
      setIsPrevBtnHidden(true);
    } else {
      setIsPrevBtnHidden(false);
    }
    sliderRef.current.scrollLeft -=
      sliderRef.current.clientWidth - calcToScroll;
  };
  const handleNextBtnClick = () => {
    const calcToScroll = (sliderRef.current.clientWidth - 60) / 9;
    clientWidth = sliderRef.current.clientWidth;
    scrollLeft = sliderRef.current.scrollLeft;
    scrollWidth = sliderRef.current.scrollWidth;
    if (isPrevBtnHidden) {
      setIsPrevBtnHidden(false);
    }
    if (scrollLeft + 2 * clientWidth >= scrollWidth) {
      setIsNextBtnHidden(true);
    } else {
      setIsNextBtnHidden(false);
    }
    sliderRef.current.scrollLeft +=
      sliderRef.current.clientWidth - calcToScroll;
  };
  let startX;
  let endX;
  const handleDragStart = (event) => {
    console.log(event);
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

  return (
    <div className={isViewAll ? "slider viewAll" : "slider"} ref={tempRef}>
      {!isViewAll && (
        <>
          {!isPrevBtnHidden && (
            <button className="sliderBtn prevBtn" onClick={handlePrevBtnClick}>
              &lt;
            </button>
          )}
          {!isNextBtnHidden && (
            <button className="sliderBtn nextBtn" onClick={handleNextBtnClick}>
              &gt;
            </button>
          )}
        </>
      )}

      <div
        className="slideContainer"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        ref={sliderRef}
      >
        {moviesData.map((movieData) => (
          <div
            key={movieData.id}
            className="slide"
            onClick={() => {
              changeCurrrentMovieData(movieData);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
              alt="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
