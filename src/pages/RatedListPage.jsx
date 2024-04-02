import { useCallback, useEffect, useState } from "react";
import "./RatedListPage.scss";
import CategorywiseListSkeleton from "../components/HomePage/CategorywiseListSkeleton";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import { fetchRatedList } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import { ratedCategoriesType } from "../data/data.js";

const RatedListPage = () => {
  const [ratedMedia, setRatedMedia] = useState({
    list: [],
    isLoading: true,
  });
  const [loggedInUser] = useLocalStorage("loggedInUser", {});

  const fetchRatedCategoryData = useCallback(
    async (category) => {
      const res = await fetchRatedList({
        sessionID: loggedInUser.sessionID,
        category: category,
      });
      return {
        categoryTitle: category,
        moviesData: res.results,
      };
    },
    [loggedInUser.sessionID]
  );
  const fetchRatedListData = useCallback(async () => {
    try {
      const response = await Promise.all(
        ratedCategoriesType.map((category) => fetchRatedCategoryData(category))
      );
      setRatedMedia({
        list: response,
        isLoading: false,
      });
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchRatedCategoryData]);

  useEffect(() => {
    fetchRatedListData();
  }, [fetchRatedListData]);

  return (
    <div className="myRatedListPage">
      <div className="categoryWrapper">
        {ratedMedia.isLoading
          ? ratedCategoriesType.map((ele, idx) => (
              <CategorywiseListSkeleton key={idx} />
            ))
          : ratedMedia.list.map(
              (ratedListCategory) =>
                ratedListCategory.moviesData && (
                  <CategorywiseList
                    key={ratedListCategory.categoryTitle}
                    categoryTitle={ratedListCategory.categoryTitle}
                    moviesData={ratedListCategory.moviesData}
                    mediaType={ratedListCategory.categoryTitle}
                  />
                )
            )}
      </div>
    </div>
  );
};

export default RatedListPage;
