import { useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { changeFormatOfTitle } from "../../utils/utilityFunctions";
import CategorywiseListSkeleton from "./CategorywiseListSkeleton";

const CategorywiseList = ({
  categoryTitle,
  moviesData,
  isDeletable = false,
  removeFromList,
  mediaType,
  isSeasonList,
  style,
  onClick,
  isLoading,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [needOfViewAllBtn, setNeedOfViewAllBtn] = useState(true);

  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };

  if (isLoading) {
    return <CategorywiseListSkeleton />;
  }
  return (
    <div className="categoryWiseList" style={style}>
      <div className="categoryHeader">
        <h3 className="categoryHeading" style={{ textTransform: "capitalize" }}>
          {changeFormatOfTitle(categoryTitle)}
        </h3>
        {moviesData && needOfViewAllBtn && moviesData.length !== 0 && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isViewAll ? "Less" : "More"}
          </p>
        )}
      </div>

      {moviesData && moviesData.length > 0 && (
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
      )}
      {moviesData && moviesData.length === 0 && (
        <p style={{ color: "#fff" }}>
          Your {mediaType} List Looks empty. Add from{" "}
          <Link to={`/${mediaType === "movie" ? "movies" : mediaType}`}>
            <span style={{ textDecoration: "underline" }}>{mediaType}</span>
          </Link>{" "}
        </p>
      )}
    </div>
  );
};

CategorywiseList.propTypes = {
  categoryTitle: PropTypes.string,
  moviesData: PropTypes.array,
  isDeletable: PropTypes.bool,
  removeFromList: PropTypes.func,
  mediaType: PropTypes.string,
  isSeasonList: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CategorywiseList;
