/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import "./Slider.scss";
import { Link, useSearchParams } from "react-router-dom";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import {
  getImagePath,
  handleFallBackImage,
} from "../../utils/utilityFunctions";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";

const Slider = ({
  isViewAll = false,
  moviesData,
  isDeletable = false,
  removeFromList,
  mediaType,
  isSeasonList = false,
  // style,
  setNeedOfViewAllBtn,
}) => {
  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("id");
  const sliderRef = useRef();
  const tempRef = useRef();
  const [isPrevBtnHidden, setIsPrevBtnHidden] = useState(true);
  const [isNextBtnHidden, setIsNextBtnHidden] = useState(false);

  let clientWidth = 0;
  let scrollLeft = 0;
  let scrollWidth = 0;
  const handleSliderBtnVisibility = useCallback((scrollLeft) => {
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
      handleSliderBtnVisibility(scrollLeft);
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
      handleSliderBtnVisibility(scrollLeft);
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
      handleSliderBtnVisibility(scrollLeft);
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
      // style={style}
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
        {moviesData.map(({ id, season_number, poster_path, rating, name }) => (
          <RenderIfVisible key={id}>
            <div className={isDeletable ? "slide deletableSlide" : "slide"}>
              <Link
                to={
                  isSeasonList
                    ? `/${mediaType}/moreInfo?id=${mediaId}&season=${season_number}`
                    : `/${mediaType}/moreInfo?id=${id}`
                }
              >
                <img
                  src={
                    poster_path
                      ? getImagePath(poster_path)
                      : posterFallBackImage
                  }
                  alt="image"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    handleFallBackImage(event, posterFallBackImage);
                  }}
                />
              </Link>
              <div
                className="deleteIcon"
                onClick={() => {
                  removeFromList({
                    mediaId: id,
                    media_type: mediaType,
                  });
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              {rating && <span className="rating">{rating.toFixed(1)}</span>}

              {isSeasonList && (
                <div className="slideTitle" title={name}>
                  {name}
                </div>
              )}
            </div>
          </RenderIfVisible>
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
  // style: PropTypes.object,
  setNeedOfViewAllBtn: PropTypes.func,
};

export default Slider;
