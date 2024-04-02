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
  const [watchList, setwatchList] = useState({
    list: [],
    isLoading: true,
  });

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
      setwatchList({
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
        let tempWatchList = watchList.list;
        const idx = tempWatchList.findIndex(
          (categoryWiseList) => categoryWiseList.categoryTitle === media_type
        );
        tempWatchList[idx] = {
          ...tempWatchList[idx],
          moviesData: tempWatchList[idx].moviesData.filter(
            (media) => media.id !== mediaId
          ),
        };
        setwatchList({
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

  console.log(watchList.list);

  return (
    <div className="myWatchListPage">
      <div className="categoryWrapper">
        {watchList.isLoading
          ? Array(2)
              .fill()
              .map((ele, idx) => <CategorywiseListSkeleton key={idx} />)
          : watchList.list.map((watchListCategory) => (
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
