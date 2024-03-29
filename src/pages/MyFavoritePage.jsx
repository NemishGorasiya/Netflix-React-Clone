import "./MyFavoritePage.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import useLocalStorage from "../hooks/useLocalStorage";
import { addToFavorite, fetchFavoriteList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import { favoriteListCategories } from "../data/data";
import toast from "react-hot-toast";

const MyFavoritePage = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [favoriteListData, setFavoriteListData] = useState([]);
  const { movie, tv } = favoriteListCategories;

  const fetchMovies = useCallback(async () => {
    const res = await fetchFavoriteList({
      sessionID: loggedInUser.sessionID,
      favoriteListCategory: "movies",
    });
    return {
      categoryTitle: movie.toLocaleLowerCase(),
      moviesData: res.results,
    };
  }, [loggedInUser.sessionID, movie]);
  const fetchTVs = useCallback(async () => {
    const res = await fetchFavoriteList({
      sessionID: loggedInUser.sessionID,
      favoriteListCategory: "tv",
    });
    return {
      categoryTitle: tv.toLocaleLowerCase(),
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
      if (res.success) {
        fetchFavoriteListData();
        toast.success(res.status_message, {});
      } else {
        toast.error(res.status_message, {});
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
              mediaType={favoriteListCategory.categoryTitle}
            />
          ))}
      </div>
    </div>
  );
};

export default MyFavoritePage;
