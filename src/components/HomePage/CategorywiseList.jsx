import { useCallback, useEffect, useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";
import {
  addToFavorite,
  addToWatchList,
  fetchFavorite,
  fetchMovies,
  fetchWatchList,
} from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage.jsx";

const CategorywiseList = ({
  movieType,
  isWatchList = false,
  isFavoriteList = false,
  watchListCategory,
  favoriteCategory,
  isDeletable,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [moviesData, setMoviesData] = useState({});
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", {});

  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };
  const fetchData = useCallback(async () => {
    if (isWatchList) {
      const res = await fetchWatchList({
        sessionID: loggedInUser.sessionID,
        watchListCategory: watchListCategory,
      });
      setMoviesData(res);
    } else if (isFavoriteList) {
      const res = await fetchFavorite({
        sessionID: loggedInUser.sessionID,
        favoriteCategory: favoriteCategory,
      });
      setMoviesData(res);
    } else {
      const res = await fetchMovies(movieType);
      setMoviesData(res);
    }
  }, [
    favoriteCategory,
    isFavoriteList,
    isWatchList,
    loggedInUser.sessionID,
    movieType,
    watchListCategory,
  ]);

  const handleRemoveFromWatchList = async ({
    media_id,
    media_type,
    addingOrRemoving,
  }) => {
    const res = await addToWatchList({
      sessionID: loggedInUser.sessionID,
      media_id: media_id,
      media_type: media_type,
      addingOrRemoving: addingOrRemoving,
    });
    if (res) {
      fetchData();
    }
  };
  const handleRemoveFromFavorite = async ({
    media_id,
    media_type,
    addingOrRemoving,
  }) => {
    const res = await addToFavorite({
      sessionID: loggedInUser.sessionID,
      media_id: media_id,
      media_type: media_type,
      addingOrRemoving: addingOrRemoving,
    });
    if (res) {
      fetchData();
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let categoryHeading = movieType;
  if (isWatchList) {
    categoryHeading = watchListCategory;
  } else if (isFavoriteList) {
    categoryHeading = favoriteCategory;
  }

  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">{categoryHeading}</h3>
        {moviesData.results && moviesData.results.length !== 0 && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isViewAll ? "Less" : "More"}
          </p>
        )}
      </div>
      {moviesData.results && moviesData.results.length !== 0 && (
        <Slider
          isViewAll={isViewAll}
          moviesData={moviesData.results}
          isDeletable={isDeletable}
          handleRemoveFromWatchList={handleRemoveFromWatchList}
          watchListCategory={watchListCategory}
          handleRemoveFromFavorite={handleRemoveFromFavorite}
          isFavoriteList={isFavoriteList}
          favoriteCategory={favoriteCategory}
        />
      )}
      {moviesData.results && moviesData.results.length === 0 && (
        <h1 style={{ color: "#fff" }}>Oops nothing to show</h1>
      )}
    </div>
  );
};

export default CategorywiseList;
