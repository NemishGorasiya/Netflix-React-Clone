import PropTypes from "prop-types";
import { useMemo } from "react";
import RenderIfVisible from "react-render-if-visible";
import { useNavigate } from "react-router-dom";
import { changeFormatOfTitle } from "../../utils/utilityFunctions";
import "./CategoryWiseList.scss";
import Slider from "./Slider";

const CategoryWiseList = ({
  categoryTitle,
  mediaType,
  isSeasonList,
  seriesId,
  listType,
}) => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate(`/explore?mediaType=${mediaType}&category=${categoryTitle}`);
  };

  const categoryHeading = useMemo(
    () => changeFormatOfTitle(categoryTitle),
    [categoryTitle]
  );

  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">{categoryHeading}</h3>
        <p className="viewAll" onClick={handleViewAllClick}>
          View More
        </p>
      </div>

      <RenderIfVisible stayRendered={true}>
        <Slider
          categoryTitle={categoryTitle}
          mediaType={mediaType}
          isSeasonList={isSeasonList}
          seriesId={seriesId}
          listType={listType}
        />
      </RenderIfVisible>
    </div>
  );
};

CategoryWiseList.propTypes = {
  categoryTitle: PropTypes.string,
  mediaType: PropTypes.string,
  isSeasonList: PropTypes.bool,
  seriesId: PropTypes.string,
  listType: PropTypes.string,
};

export default CategoryWiseList;
