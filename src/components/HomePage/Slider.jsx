/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useRef, useState } from "react";
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
  isViewAllBtnVisible,
  makeViewAllButtonHidden,
}) => {
  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("id");
  const sliderRef = useRef();

  const [sliderButtons, setSliderButtons] = useState({
    prevBtn: false,
    nextBtn: true,
  });
  const { prevBtn, nextBtn } = sliderButtons;

  let clientWidth = 0;
  let scrollLeft = 0;
  let scrollWidth = 0;

  const handleSliderBtnVisibility = useCallback((scrollLeft) => {
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;

    setSliderButtons((prevState) => ({
      ...prevState,
      prevBtn: scrollLeft > 0,
      nextBtn: scrollLeft + clientWidth < scrollWidth,
    }));
  }, []);

  const handlePrevBtnClick = () => {
    scrollLeft = sliderRef.current.scrollLeft - sliderRef.current.clientWidth;
    sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
    handleSliderBtnVisibility(scrollLeft);
  };
  const handleNextBtnClick = () => {
    scrollLeft = sliderRef.current.scrollLeft + sliderRef.current.clientWidth;
    sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
    handleSliderBtnVisibility(scrollLeft);
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
      makeViewAllButtonHidden();
    }
  }, [moviesData]);

  useEffect(() => {
    scrollWidth = sliderRef.current.scrollWidth;
    clientWidth = sliderRef.current.clientWidth;
    if (scrollWidth <= clientWidth) {
      makeViewAllButtonHidden();
    }
  }, []);

  console.log("called");

  return (
    <div className={isViewAll ? "slider viewAll" : "slider"}>
      {!isViewAll && (
        <>
          {isViewAllBtnVisible && prevBtn && (
            <button className="sliderBtn prevBtn" onClick={handlePrevBtnClick}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}
          {isViewAllBtnVisible && nextBtn && (
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
          <RenderIfVisible key={id} stayRendered={true}>
            <div
              key={id}
              className={isDeletable ? "slide deletableSlide" : "slide"}
            >
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
  isViewAllBtnVisible: PropTypes.bool,
  makeViewAllButtonHidden: PropTypes.func,
};

const SliderComponent = memo(Slider);

export default SliderComponent;
