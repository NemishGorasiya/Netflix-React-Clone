import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { formatTitle } from "../../utils/utilityFunctions";
import Slider from "./Slider";
import "./CategoryWiseList.scss";

const CategoryWiseList = ({
  categoryTitle,
  mediaType,
  isSeasonList,
  seriesId,
  listType,
}) => {
  const navigate = useNavigate();

  // if there is less data then no need to display "show more" button
  const [isNeedToExpand, setIsNeedToExpand] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const setNoNeedToExpand = useCallback(() => {
    setIsNeedToExpand(false);
  }, []);

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
        <h3 className="categoryHeading">{formatTitle(categoryTitle)}</h3>
        {isNeedToExpand && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isExpanded ? "Less" : "All"}
          </p>
        )}
      </div>

      {/* RenderIfVisible for improving performance by selectively rendering
      components only when they are visible within the viewport */}
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
  categoryTitle: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  isSeasonList: PropTypes.bool,
  seriesId: PropTypes.string,
  listType: PropTypes.string,
};

export default CategoryWiseList;
