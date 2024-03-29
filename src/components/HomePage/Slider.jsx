import { useCallback, useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { Link, useSearchParams } from "react-router-dom";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import PropTypes from "prop-types";

const Slider = ({
  isViewAll = false,
  moviesData,
  isDeletable = false,
  removeFromList,
  mediaType,
  isSeasonList = false,
  style,
  onClick,
  setNeedOfViewAllBtn,
}) => {
  const [searchParamas] = useSearchParams();
  const mediaId = searchParamas.get("id");
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
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;
    if (scrollWidth === clientWidth) {
      setIsNextBtnHidden(true);
      setIsPrevBtnHidden(true);
    } else {
      handleSliderBtnVisiblity(scrollLeft);
    }
    sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
  };
  const handleNextBtnClick = () => {
    scrollLeft = sliderRef.current.scrollLeft + sliderRef.current.clientWidth;
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;
    if (scrollWidth === clientWidth) {
      setIsNextBtnHidden(true);
      setIsPrevBtnHidden(true);
    } else {
      handleSliderBtnVisiblity(scrollLeft);
    }
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

  useEffect(() => {
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;
    if (scrollWidth <= clientWidth) {
      setIsNextBtnHidden(true);
      setNeedOfViewAllBtn(false);
    }
  }, [moviesData]);

  return (
    <div
      style={style}
      className={isViewAll ? "slider viewAll" : "slider"}
      ref={tempRef}
    >
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
        {moviesData.map((movieData) => (
          <div
            key={movieData.id}
            className={isDeletable ? "slide deletableSlide" : "slide"}
          >
            <Link
              to={
                isSeasonList
                  ? `/${mediaType}/moreInfo?id=${mediaId}&season=${movieData.season_number}`
                  : `/${mediaType}/moreInfo?id=${movieData.id}`
              }
            >
              <img
                src={
                  movieData.poster_path
                    ? `https://image.tmdb.org/t/p/original/${movieData.poster_path}`
                    : posterFallBackImage
                }
                alt="image"
                onError={(event) => {
                  handleFallBackImage(event, posterFallBackImage);
                }}
              />
            </Link>

            <div
              className="deleteIcon"
              onClick={() => {
                removeFromList({
                  mediaId: movieData.id,
                  media_type: mediaType,
                });
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            {isSeasonList && (
              <div className="slideTitle" title={movieData.name}>
                {movieData.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  isViewAll: PropTypes.bool,
  moviesData: PropTypes.array,
  isDeletable: PropTypes.bool,
  removeFromList: PropTypes.func,
  mediaType: PropTypes.string,
  isSeasonList: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  setNeedOfViewAllBtn: PropTypes.func,
};

export default Slider;
