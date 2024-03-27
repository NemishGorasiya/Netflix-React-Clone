import { useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";
import PropTypes from "prop-types";

const CategorywiseList = ({
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
        <h3 className="categoryHeading">{categoryTitle}</h3>
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
        <h1 style={{ color: "#fff" }}>Oops nothing to show</h1>
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
};

export default CategorywiseList;
