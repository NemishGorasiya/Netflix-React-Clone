import { useCallback, useEffect, useState } from "react";
import "./RatedListPage.scss";
import CategoryWiseListSkeleton from "../components/HomePage/CategoryWiseListSkeleton.jsx";
import CategoryWiseList from "../components/HomePage/CategoryWiseList";
import { fetchRatedList } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import { ratedCategoriesType } from "../data/data.jsx";

const RatedListPage = () => {
  const [ratedMedia, setRatedMedia] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = ratedMedia;
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
        {isLoading
          ? ratedCategoriesType.map((_ele, idx) => (
              <CategoryWiseListSkeleton key={idx} />
            ))
          : list.map(
              (ratedListCategory) =>
                ratedListCategory.moviesData && (
                  <CategoryWiseList
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
