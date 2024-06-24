import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RenderIfVisible from "react-render-if-visible";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import { fetchMediaData, fetchMoreInfoOfMedia } from "../../services/services";
import {
  getImagePath,
  handleFallBackImage,
} from "../../utils/utilityFunctions";
import "./Slider.scss";
import SliderSkeleton from "./SliderSkeleton";

const Slider = ({
  categoryTitle,
  seriesId,
  mediaType,
  isSeasonList = false,
  listType,
  isExpanded = false,
  setNoNeedToExpand,
  isNeedToExpand,
  list,
}) => {
  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("id");
  const sliderRef = useRef();

  const startX = useRef(null);
  const endX = useRef(null);

  const [media, setMedia] = useState({
    list: [],
    isLoading: true,
  });
  const { list: mediaList, isLoading: isMediaLoading } = media;

  const [sliderButtons, setSliderButtons] = useState({
    prevBtn: false,
    nextBtn: true,
  });
  const { prevBtn, nextBtn } = sliderButtons;

  // To check is there any need to show "Previous or Next button "
  // For Ex. if already reaches at last slide no need to show "Next button"
  const handleSliderBtnVisibility = useCallback((scrollLeft) => {
    const scrollWidth = sliderRef.current.scrollWidth;
    const clientWidth = sliderRef.current.clientWidth;
    setSliderButtons({
      prevBtn: scrollLeft > 0,
      nextBtn: scrollLeft + clientWidth < scrollWidth,
    });
  }, []);

  const onPrevBtnClick = () => {
    const scrollLeft =
      sliderRef.current.scrollLeft - sliderRef.current.clientWidth - 15;
    sliderRef.current.scrollLeft = scrollLeft;
    handleSliderBtnVisibility(scrollLeft);
  };

  const onNextBtnClick = () => {
    const scrollLeft =
      sliderRef.current.scrollLeft + sliderRef.current.clientWidth + 15;
    sliderRef.current.scrollLeft = scrollLeft;
    handleSliderBtnVisibility(scrollLeft);
  };

  // let startX;
  // let endX;

  const handleMouseDrag = () => {
    if (startX.current - endX.current > 50) {
      onNextBtnClick();
    } else if (startX.current - endX.current < -50) {
      onPrevBtnClick();
    }
  };

  // for touchscreen devices
  const onTouchStart = (event) => {
    startX.current = event.changedTouches[0].clientX;
  };
  const onTouchEnd = (event) => {
    endX.current = event.changedTouches[0].clientX;
    handleMouseDrag();
  };

  // for mouse devices
  const onDragStart = (event) => {
    startX.current = event.clientX;
  };
  const onDragEnd = (event) => {
    endX.current = event.clientX;
    handleMouseDrag();
  };

  // After collapsing expanded data, check the visibility of the previous and next buttons.
  useEffect(() => {
    if (sliderRef.current) {
      handleSliderBtnVisibility(sliderRef.current.scrollLeft);
    }
  }, [handleSliderBtnVisibility, isExpanded]);

  // After loading the data, check if there is a need to show the "View All" button.
  useEffect(() => {
    if (sliderRef.current?.scrollWidth <= sliderRef.current?.clientWidth) {
      setNoNeedToExpand();
    }
  }, [isMediaLoading, setNoNeedToExpand]);

  const fetchMedia = useCallback(
    async ({ signal }) => {
      try {
        let res;
        if (isSeasonList || listType === "seasonList") {
          res = await fetchMoreInfoOfMedia({
            mediaId,
            mediaType,
            signal,
          });
        } else {
          res = await fetchMediaData({
            mediaType,
            mediaCategory: categoryTitle,
            signal,
          });
        }

        if (res) {
          const { results, seasons } = res;
          setMedia({
            list: results || seasons,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mediaId, mediaType, categoryTitle, isSeasonList, listType]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (list?.length) {
      setMedia({
        list,
        isLoading: false,
      });
    } else {
      fetchMedia({ signal: abortController.signal });
    }
    return () => {
      abortController.abort();
    };
  }, [fetchMedia, list]);

  return isMediaLoading ? (
    <SliderSkeleton />
  ) : (
    <div className="slider">
      {isNeedToExpand && !isExpanded && (
        <>
          {prevBtn && (
            <button className="sliderBtn prevBtn" onClick={onPrevBtnClick}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}
          {nextBtn && (
            <button className="sliderBtn nextBtn" onClick={onNextBtnClick}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </>
      )}

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        ref={sliderRef}
        className={`slideContainer ${isExpanded ? "expanded" : ""}`}
      >
        {mediaList.map(({ id, season_number, poster_path }) => (
          <RenderIfVisible key={id} stayRendered={true}>
            <div className="slide">
              <Link
                to={`/${mediaType}/moreInfo?id=${
                  isSeasonList ? seriesId : id || mediaId
                }${season_number ? `&season=${season_number}` : ""}`}
              >
                <img
                  src={
                    poster_path
                      ? getImagePath(poster_path)
                      : posterFallBackImage
                  }
                  alt={`${mediaType} poster`}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    handleFallBackImage(event, posterFallBackImage);
                  }}
                />
              </Link>
            </div>
          </RenderIfVisible>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  seriesId: PropTypes.string,
  mediaType: PropTypes.string.isRequired,
  isSeasonList: PropTypes.bool,
  listType: PropTypes.string,
  isExpanded: PropTypes.bool,
  setNoNeedToExpand: PropTypes.func.isRequired,
  isNeedToExpand: PropTypes.bool.isRequired,
  list: PropTypes.array,
};

const SliderComponent = memo(Slider);

export default SliderComponent;
