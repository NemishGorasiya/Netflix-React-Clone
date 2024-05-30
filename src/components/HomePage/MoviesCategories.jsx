import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import CategoryWiseList from "./CategoryWiseList";
import { movieTypes, tvShowsTypes } from "../../constants/constants";
import { formatTitle } from "../../utils/utilityFunctions";
import "./MoviesCategories.scss";

const MoviesCategories = ({ mediaType }) => {
  const categories = mediaType === "movie" ? movieTypes : tvShowsTypes;

  return (
    <div className="moviesCategoriesWrapper">
      <h1 className="moviesCategoriesTitle">{formatTitle(mediaType)}</h1>
      {categories.map((category) => (
        <RenderIfVisible key={category} stayRendered={true}>
          <CategoryWiseList categoryTitle={category} mediaType={mediaType} />
        </RenderIfVisible>
      ))}
    </div>
  );
};

MoviesCategories.propTypes = {
  mediaType: PropTypes.string.isRequired,
};

export default MoviesCategories;
