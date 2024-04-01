import { useCallback, useEffect, useState } from "react";
import "./RatedListPage.scss";
import CategorywiseListSkeleton from "../components/HomePage/CategorywiseListSkeleton";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import { fetchRatedList } from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import { ratedCategoriesType } from "../data/data.js";

const RatedListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ratedListData, setRatedListData] = useState([]);
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
    setIsLoading(true);
    try {
      const response = await Promise.all(
        ratedCategoriesType.map((category) => fetchRatedCategoryData(category))
      );
      setRatedListData(response);
      setIsLoading(false);
    } catch {
      throw Error("Promise failed");
    }
  }, [fetchRatedCategoryData]);

  useEffect(() => {
    fetchRatedListData();
  }, [fetchRatedListData]);

  return (
    <div className="myRatedListPage">
      <HomePageNavBar />
      <div className="categoryWrapper">
        {isLoading &&
          Array(3)
            .fill()
            .map((ele, idx) => <CategorywiseListSkeleton key={idx} />)}
        {ratedListData &&
          ratedListData.map(
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
