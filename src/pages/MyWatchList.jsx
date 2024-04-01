import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import "./MyWatchList.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import { addToWatchList, fetchWatchList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { watchListCategories } from "../data/data";
import toast from "react-hot-toast";
import CategorywiseListSkeleton from "../components/HomePage/CategorywiseListSkeleton";

const MyWatchList = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [watchListData, setWatchListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryWiseData = useCallback(
    async (category) => {
      const res = await fetchWatchList({
        sessionID: loggedInUser.sessionID,
        watchListCategory: category === "movie" ? "movies" : category,
      });
      return {
        categoryTitle: category,
        moviesData: res.results,
      };
    },
    [loggedInUser.sessionID]
  );

  const fetchWatchListData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await Promise.all(
        watchListCategories.map((category) => fetchCategoryWiseData(category))
      );
      setWatchListData(response);
      setIsLoading(false);
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchCategoryWiseData]);

  const removeFromWatchList = async ({ mediaId, media_type = "movie" }) => {
    try {
      const res = await addToWatchList({
        sessionID: loggedInUser.sessionID,
        media_id: mediaId,
        media_type: media_type,
        isAdding: false,
      });
      if (res.success) {
        fetchWatchListData();
        toast.success(res.status_message, {});
      } else {
        toast.error(res.status_message, {});
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
        {isLoading &&
          Array(2)
            .fill()
            .map((ele, idx) => <CategorywiseListSkeleton key={idx} />)}
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
