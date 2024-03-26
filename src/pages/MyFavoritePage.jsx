import "./MyFavoritePage.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import useLocalStorage from "../hooks/useLocalStorage";
import { addToFavorite, fetchFavoriteList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import { favoriteListCategories } from "../data/data";

const MyFavoritePage = () => {
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", {});
  const [favoriteListData, setFavoriteListData] = useState([]);
  const { movies, tv } = favoriteListCategories;

  const fetchMovies = useCallback(async () => {
    const res = await fetchFavoriteList({
      sessionID: loggedInUser.sessionID,
      favoriteListCategory: movies.toLocaleLowerCase(),
    });
    return {
      categoryTitle: movies,
      moviesData: res.results,
    };
  }, [loggedInUser.sessionID, movies]);
  const fetchTVs = useCallback(async () => {
    const res = await fetchFavoriteList({
      sessionID: loggedInUser.sessionID,
      favoriteListCategory: tv.toLocaleLowerCase(),
    });
    return {
      categoryTitle: tv,
      moviesData: res.results,
    };
  }, [loggedInUser.sessionID, tv]);

  const fetchFavoriteListData = useCallback(async () => {
    try {
      const response = await Promise.all([fetchMovies(), fetchTVs()]);
      setFavoriteListData(response);
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchMovies, fetchTVs]);

  const removeFromFavoriteList = async ({ mediaId, media_type = "movie" }) => {
    try {
      const res = await addToFavorite({
        sessionID: loggedInUser.sessionID,
        media_id: mediaId,
        media_type: media_type,
        isAdding: false,
      });
      if (res) {
        fetchFavoriteListData();
        console.log("Removed successfully from favorite");
      } else {
        console.log("something went wrong while removinfg from favorite");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavoriteListData();
  }, [fetchFavoriteListData]);
  return (
    <div className="myFavoritePage">
      <HomePageNavBar />
      <div className="categoryWrapper">
        {favoriteListData &&
          favoriteListData.map((favoriteListCategory) => (
            <CategorywiseList
              key={favoriteListCategory.categoryTitle}
              categoryTitle={favoriteListCategory.categoryTitle}
              moviesData={favoriteListCategory.moviesData}
              isDeletable={true}
              removeFromList={removeFromFavoriteList}
            />
          ))}
      </div>
    </div>
  );
};

export default MyFavoritePage;
