import { useCallback, useEffect, useState } from "react";
import "./CarouselSlider.scss";
import PropTypes from "prop-types";
import CarouselSliderSkeleton from "./CarouselSliderSkeleton";
import CarouselSlide from "./CarouselSlide";
import { fetchMediaData } from "../../services/services";

const CarouselSlider = ({ mediaType }) => {
  const [count, setCount] = useState(0);
  const [media, setMedia] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = media;

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCount((prevCount) =>
        prevCount + 1 === list.length ? 0 : prevCount + 1
      );
    }, 4000);
    return () => {
      clearInterval(myInterval);
    };
  }, [count, list]);

  const fetchMedia = useCallback(
    async ({ abortController } = {}) => {
      try {
        const res = await fetchMediaData({
          mediaType,
          mediaCategory: "popular",
          abortController,
        });

        if (res) {
          const { results } = res;
          setMedia({
            list: results,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mediaType]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchMedia({ abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchMedia]);

  return (
    <div className="displayMoviesContainer">
      {isLoading ? (
        <CarouselSliderSkeleton />
      ) : (
        list.map((displayMovie) => (
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
  mediaType: PropTypes.string,
};

export default CarouselSlider;
