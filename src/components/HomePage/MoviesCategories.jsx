import CategorywiseList from "./CategorywiseList";
import "./MoviesCategories.scss";

const MoviesCategories = () => {
  return (
    <div className="moviesCategoriesWrapper">
      <CategorywiseList />
      <CategorywiseList />
      <CategorywiseList />
      <CategorywiseList />
    </div>
  );
};

export default MoviesCategories;
