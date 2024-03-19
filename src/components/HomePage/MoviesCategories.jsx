import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";

const MoviesCategories = ({ changeCurrrentMovieData }) => {
  return (
    <div className="moviesCategoriesWrapper">
      <CategorywiseList
        changeCurrrentMovieData={changeCurrrentMovieData}
        categoryTitle={"Now Playing"}
        movieType={"now_playing"}
      />
      <CategorywiseList
        changeCurrrentMovieData={changeCurrrentMovieData}
        categoryTitle={"Upcoming"}
        movieType={"upcoming"}
      />
      <CategorywiseList
        changeCurrrentMovieData={changeCurrrentMovieData}
        categoryTitle={"Popular"}
        movieType={"popular"}
      />
      <CategorywiseList
        changeCurrrentMovieData={changeCurrrentMovieData}
        categoryTitle={"Top Rated"}
        movieType={"top_rated"}
      />
    </div>
  );
};

export default MoviesCategories;
