import CategoryWiseList from "./CategoryWiseList.jsx";
import "./MoviesCategories.scss";
import { movieTypes, tvShowsTypes } from "../../constants/constants.js";
import { fetchMediaData } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { changeFormatOfTitle } from "../../utils/utilityFunctions.js";
import CategoryWiseListSkeleton from "./CategoryWiseListSkeleton.jsx";

const MoviesCategories = ({ mediaType }) => {
  const [mediaList, setMediaList] = useState({
    list: [],
    isLoading: true,
  });
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
      setMediaList({
        list: response,
        isLoading: false,
      });
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
      {mediaList.isLoading
        ? mediaCategories.map((movieCategory) => (
            <CategoryWiseListSkeleton key={movieCategory} />
          ))
        : mediaList.list.map(({ categoryTitle, moviesData }) => (
            <RenderIfVisible key={categoryTitle}>
              <CategoryWiseList
                categoryTitle={categoryTitle}
                moviesData={moviesData}
                mediaType={mediaType}
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
