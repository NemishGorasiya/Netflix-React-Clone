import PropTypes from "prop-types";
import { useState } from "react";
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
  const [isNeedToExpand, setIsNeedToExpand] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const setNoNeedToExpand = () => {
    setIsNeedToExpand(false);
  };

  const handleViewAllClick = () => {
    if (isSeasonList) {
      setIsExpanded((prevState) => !prevState);
    } else {
      navigate(`/explore?mediaType=${mediaType}&category=${categoryTitle}`);
    }
  };

  return (
    <div className="categoryWiseList">
      <div className="categoryHeader">
        <h3 className="categoryHeading">
          {changeFormatOfTitle(categoryTitle)}
        </h3>
        {isNeedToExpand && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isExpanded ? "Less" : "All"}
          </p>
        )}
      </div>

      <RenderIfVisible stayRendered={true}>
        <Slider
          categoryTitle={categoryTitle}
          mediaType={mediaType}
          isSeasonList={isSeasonList}
          seriesId={seriesId}
          listType={listType}
          isExpanded={isExpanded}
          setNoNeedToExpand={setNoNeedToExpand}
          isNeedToExpand={isNeedToExpand}
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
