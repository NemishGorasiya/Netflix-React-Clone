import { useState } from "react";
import "./CategoryWiseList.scss";
import Slider from "./Slider";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { changeFormatOfTitle } from "../../utils/utilityFunctions";
import RenderIfVisible from "react-render-if-visible";

const CategoryWiseList = ({
  categoryTitle,
  moviesData,
  isDeletable = false,
  removeFromList,
  mediaType,
  isSeasonList,
  style,
  onClick,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [needOfViewAllBtn, setNeedOfViewAllBtn] = useState(true);

  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };

  return (
    <div className="categoryWiseList" style={style}>
      <div className="categoryHeader">
        <h3 className="categoryHeading">
          {changeFormatOfTitle(categoryTitle)}
        </h3>
        {moviesData && needOfViewAllBtn && moviesData.length !== 0 && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isViewAll ? "Less" : "More"}
          </p>
        )}
      </div>

      {moviesData && moviesData.length > 0 && (
        <RenderIfVisible>
          <Slider
            isViewAll={isViewAll}
            moviesData={moviesData}
            isDeletable={isDeletable}
            removeFromList={removeFromList}
            mediaType={mediaType}
            isSeasonList={isSeasonList}
            onClick={onClick}
            setNeedOfViewAllBtn={setNeedOfViewAllBtn}
          />
        </RenderIfVisible>
      )}
      {moviesData && moviesData.length === 0 && (
        <p className="fallBackMessage">
          Your {mediaType} List Looks empty. Add from{" "}
          <Link to={`/${mediaType === "movie" ? "movies" : mediaType}`}>
            <span>{mediaType}</span>
          </Link>{" "}
        </p>
      )}
    </div>
  );
};

CategoryWiseList.propTypes = {
  categoryTitle: PropTypes.string,
  moviesData: PropTypes.array,
  isDeletable: PropTypes.bool,
  removeFromList: PropTypes.func,
  mediaType: PropTypes.string,
  isSeasonList: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default CategoryWiseList;
