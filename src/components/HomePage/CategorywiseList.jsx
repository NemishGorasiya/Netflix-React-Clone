import { useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleDefaultPosterClick = () => {};

  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };

  return (
    <div className="categoryWiseList" style={style}>
      {moviesData.length > 0 && (
        <div className="categoryHeader">
          <h3 className="categoryHeading">{categoryTitle}</h3>
          {moviesData && moviesData.length !== 0 && (
            <p className="viewAll" onClick={handleViewAllClick}>
              View {isViewAll ? "Less" : "More"}
            </p>
          )}
        </div>
      )}

      {moviesData && moviesData.length !== 0 && (
        <Slider
          isViewAll={isViewAll}
          moviesData={moviesData}
          isDeletable={isDeletable}
          removeFromList={removeFromList}
          mediaType={mediaType}
          isSeasonList={isSeasonList}
          onClick={onClick}
        />
      )}
      {!moviesData && <h1 style={{ color: "#fff" }}>Oops nothing to show</h1>}
    </div>
  );
};

export default CategorywiseList;
