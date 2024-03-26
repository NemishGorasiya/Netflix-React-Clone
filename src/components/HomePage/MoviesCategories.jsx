import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";
import { movieTypes } from "../../data/data.js";
import { fetchMovies } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";

const MoviesCategories = () => {
  const [homePageMoviesData, setHomePageMoviesData] = useState([]);
  const fetchMoviesData = async (movieCategory) => {
    const res = await fetchMovies({ movieCategory: movieCategory });
    return {
      categoryTitle: movieCategory,
      moviesData: res.results,
    };
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await Promise.all([
        fetchMoviesData("now_playing"),
        fetchMoviesData("upcoming"),
        fetchMoviesData("popular"),
        fetchMoviesData("top_rated"),
      ]);
      setHomePageMoviesData(response);
    } catch (error) {
      throw Error("Promise failed");
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="moviesCategoriesWrapper">
      {homePageMoviesData &&
        homePageMoviesData.map((moviesCategory) => (
          <CategorywiseList
            key={moviesCategory.categoryTitle}
            categoryTitle={moviesCategory.categoryTitle}
            moviesData={moviesCategory.moviesData}
          />
        ))}
    </div>
  );
};

export default MoviesCategories;
