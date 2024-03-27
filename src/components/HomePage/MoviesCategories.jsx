import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";
import { movieTypes, tvShowsTypes } from "../../data/data.js";
import { fetchMediaData } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const MoviesCategories = ({ mediaType }) => {
  const [homePageMoviesData, setHomePageMoviesData] = useState([]);
  const mediaCategories = mediaType === "movie" ? movieTypes : tvShowsTypes;
  const fetchMoviesData = useCallback(
    async (mediaCategory) => {
      const res = await fetchMediaData({
        mediaType: mediaType,
        mediaCategory: mediaCategory,
      });
      return {
        categoryTitle: mediaCategory,
        moviesData: res.results,
      };
    },
    [mediaType]
  );
  const fetchData = useCallback(async () => {
    try {
      const response = await Promise.all(
        mediaCategories.map((category) => fetchMoviesData(category))
      );
      setHomePageMoviesData(response);
    } catch (error) {
      throw Error("Promise failed");
    }
  }, [fetchMoviesData, mediaCategories]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="moviesCategoriesWrapper">
      {homePageMoviesData &&
        homePageMoviesData.map((moviesCategory) => (
          <CategorywiseList
            key={moviesCategory.categoryTitle}
            categoryTitle={moviesCategory.categoryTitle}
            moviesData={moviesCategory.moviesData}
            mediaType={mediaType}
          />
        ))}
    </div>
  );
};

MoviesCategories.propTypes = {
  mediaType: PropTypes.string,
};

export default MoviesCategories;
