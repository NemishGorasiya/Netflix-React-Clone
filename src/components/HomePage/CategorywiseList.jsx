import { useCallback, useEffect, useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";
import { fetchMovies } from "../../utils/http";

const CategorywiseList = ({
  changeCurrrentMovieData,
  categoryTitle,
  movieType,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [moviesData, setMoviesData] = useState({});
  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };
  const fetchData = useCallback(async () => {
    const res = await fetchMovies({ movieType });
    setMoviesData(res);
  }, [movieType]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">{categoryTitle}</h3>
        <p className="viewAll" onClick={handleViewAllClick}>
          View {isViewAll ? "Less" : "More"}
        </p>
      </div>
      {moviesData.results && (
        <Slider
          changeCurrrentMovieData={changeCurrrentMovieData}
          isViewAll={isViewAll}
          moviesData={moviesData.results}
        />
      )}
    </div>
  );
};

export default CategorywiseList;
