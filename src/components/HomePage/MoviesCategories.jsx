import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";
import { movieTypes } from "../../data/data.js";

const MoviesCategories = () => {
  return (
    <div className="moviesCategoriesWrapper">
      {movieTypes.map((movieType) => (
        <CategorywiseList key={movieType} movieType={movieType} />
      ))}
    </div>
  );
};

export default MoviesCategories;
