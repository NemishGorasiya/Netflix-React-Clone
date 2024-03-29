import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import "./MyWatchList.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import { addToWatchList, fetchWatchList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { watchListCategories } from "../data/data";

const MyWatchList = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [watchListData, setWatchListData] = useState([]);
  const { movie, tv } = watchListCategories;

  const fetchMovies = useCallback(async () => {
    const res = await fetchWatchList({
      sessionID: loggedInUser.sessionID,
      watchListCategory: "movies",
    });
    return {
      categoryTitle: movie.toLocaleLowerCase(),
      moviesData: res.results,
    };
  }, [loggedInUser.sessionID, movie]);
  const fetchTVs = useCallback(async () => {
    const res = await fetchWatchList({
      sessionID: loggedInUser.sessionID,
      watchListCategory: "tv",
    });
    return {
      categoryTitle: tv.toLocaleLowerCase(),
      moviesData: res.results,
    };
  }, [loggedInUser.sessionID, tv]);

  const fetchWatchListData = useCallback(async () => {
    try {
      const response = await Promise.all([fetchMovies(), fetchTVs()]);
      setWatchListData(response);
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchMovies, fetchTVs]);

  const removeFromWatchList = async ({ mediaId, media_type = "movie" }) => {
    try {
      const res = await addToWatchList({
        sessionID: loggedInUser.sessionID,
        media_id: mediaId,
        media_type: media_type,
        isAdding: false,
      });
      if (res) {
        fetchWatchListData();
        console.log("Removed successfully from watchlist");
      } else {
        console.log("something went wrong while removinfg from watchlist");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWatchListData();
  }, [fetchWatchListData]);

  return (
    <div className="myWatchListPage">
      <HomePageNavBar />
      <div className="categoryWrapper">
        {watchListData &&
          watchListData.map((watchListCategory) => (
            <CategorywiseList
              key={watchListCategory.categoryTitle}
              categoryTitle={watchListCategory.categoryTitle}
              moviesData={watchListCategory.moviesData}
              isDeletable={true}
              removeFromList={removeFromWatchList}
              mediaType={watchListCategory.categoryTitle}
            />
          ))}
      </div>
    </div>
  );
};

export default MyWatchList;
