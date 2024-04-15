import "./MyWatchList.scss";
import CategoryWiseList from "../components/HomePage/CategoryWiseList";
import { addToWatchList, fetchWatchList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { watchListCategories } from "../constants/constants";
import toast from "react-hot-toast";
import CategoryWiseListSkeleton from "../components/HomePage/CategoryWiseListSkeleton";

const MyWatchList = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [watchList, setWatchList] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = watchList;

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
    try {
      const response = await Promise.all(
        watchListCategories.map((category) => fetchCategoryWiseData(category))
      );
      setWatchList({
        list: response,
        isLoading: false,
      });
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
        let tempWatchList = list;
        const idx = tempWatchList.findIndex(
          (categoryWiseList) => categoryWiseList.categoryTitle === media_type
        );
        tempWatchList[idx] = {
          ...tempWatchList[idx],
          moviesData: tempWatchList[idx].moviesData.filter(
            (media) => media.id !== mediaId
          ),
        };
        setWatchList({
          list: tempWatchList,
          isLoading: false,
        });
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
      <div className="categoryWrapper">
        {isLoading
          ? Array(2)
              .fill()
              .map((_ele, idx) => <CategoryWiseListSkeleton key={idx} />)
          : list.map(({ categoryTitle, moviesData }) => (
              <CategoryWiseList
                key={categoryTitle}
                categoryTitle={categoryTitle}
                moviesData={moviesData}
                isDeletable={true}
                removeFromList={removeFromWatchList}
                mediaType={categoryTitle}
              />
            ))}
      </div>
    </div>
  );
};

export default MyWatchList;
