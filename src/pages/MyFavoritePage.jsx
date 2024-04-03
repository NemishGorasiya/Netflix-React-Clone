import "./MyFavoritePage.scss";
import CategoryWiseList from "../components/HomePage/CategoryWiseList";
import useLocalStorage from "../hooks/useLocalStorage";
import { addToFavorite, fetchFavoriteList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import { favoriteListCategories } from "../data/data";
import toast from "react-hot-toast";
import CategoryWiseListSkeleton from "../components/HomePage/CategoryWiseListSkeleton";

const MyFavoritePage = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [favoriteMedia, setFavoriteMedia] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = favoriteMedia;

  const fetchCategoryWiseData = useCallback(
    async (category) => {
      const res = await fetchFavoriteList({
        sessionID: loggedInUser.sessionID,
        favoriteListCategory: category === "movie" ? "movies" : category,
      });
      return {
        categoryTitle: category,
        moviesData: res.results,
      };
    },
    [loggedInUser.sessionID]
  );

  const fetchFavoriteListData = useCallback(async () => {
    try {
      const response = await Promise.all(
        favoriteListCategories.map((category) =>
          fetchCategoryWiseData(category)
        )
      );
      setFavoriteMedia({
        list: response,
        isLoading: false,
      });
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchCategoryWiseData]);

  const removeFromFavoriteList = async ({ mediaId, media_type = "movie" }) => {
    try {
      const res = await addToFavorite({
        sessionID: loggedInUser.sessionID,
        media_id: mediaId,
        media_type: media_type,
        isAdding: false,
      });
      if (res.success) {
        let tempFavoriteMediaList = list;
        const idx = tempFavoriteMediaList.findIndex(
          (categoryWiseList) => categoryWiseList.categoryTitle === media_type
        );
        tempFavoriteMediaList[idx] = {
          ...tempFavoriteMediaList[idx],
          moviesData: tempFavoriteMediaList[idx].moviesData.filter(
            (media) => media.id !== mediaId
          ),
        };
        setFavoriteMedia({
          list: tempFavoriteMediaList,
          isLoading: false,
        });
        toast.success(res.status_message);
      } else {
        toast.error(res.status_message);
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
                removeFromList={removeFromFavoriteList}
                mediaType={categoryTitle}
              />
            ))}
      </div>
    </div>
  );
};

export default MyFavoritePage;
