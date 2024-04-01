import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";
import { movieTypes, tvShowsTypes } from "../../data/data.js";
import { fetchMediaData } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { changeFormatOfTitle } from "../../utils/utilityFunctions.js";

const MoviesCategories = ({ mediaType }) => {
  const [homePageMoviesData, setHomePageMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      const response = await Promise.all(
        mediaCategories.map((category) => fetchMoviesData(category))
      );
      setHomePageMoviesData(response);
      setIsLoading(false);
    } catch (error) {
      throw Error("Promise failed");
    }
  }, [fetchMoviesData, mediaCategories]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="moviesCategoriesWrapper">
      <h1 className="moviesCategoriesTitle">
        {changeFormatOfTitle(mediaType)}
      </h1>
      {isLoading &&
        movieTypes.map((movieCategory) => (
          <CategorywiseList key={movieCategory} isLoading={isLoading} />
        ))}
      {!isLoading &&
        homePageMoviesData.map((moviesCategory) => (
          <RenderIfVisible key={moviesCategory.categoryTitle}>
            <CategorywiseList
              categoryTitle={moviesCategory.categoryTitle}
              moviesData={moviesCategory.moviesData}
              mediaType={mediaType}
              isLoading={isLoading}
            />
          </RenderIfVisible>
        ))}
    </div>
  );
};

MoviesCategories.propTypes = {
  mediaType: PropTypes.string,
};

export default MoviesCategories;
