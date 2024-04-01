import "./MyFavoritePage.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import useLocalStorage from "../hooks/useLocalStorage";
import { addToFavorite, fetchFavoriteList } from "../services/services";
import { useCallback, useEffect, useState } from "react";
import { favoriteListCategories } from "../data/data";
import toast from "react-hot-toast";
import CategorywiseListSkeleton from "../components/HomePage/CategorywiseListSkeleton";

const MyFavoritePage = () => {
  const [loggedInUser] = useLocalStorage("loggedInUser", {});
  const [favoriteList, setFavoriteList] = useState({
    list: [],
    isLoading: true,
  });

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
      setFavoriteList({
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
        {favoriteList.isLoading
          ? Array(2)
              .fill()
              .map((ele, idx) => <CategorywiseListSkeleton key={idx} />)
          : favoriteList.list.map((favoriteListCategory) => (
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
