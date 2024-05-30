import CategoryWiseList from "../HomePage/CategoryWiseList";
import PropTypes from "prop-types";

const SeasonsList = ({ seriesId, seasons }) => {
  const categoryTitle = "ALL SEASONS";
  const mediaType = "tv";
  const isSeasonList = true;

  return (
    <div className="seasonsList">
      <CategoryWiseList
        categoryTitle={categoryTitle}
        mediaType={mediaType}
        isSeasonList={isSeasonList}
        seriesId={seriesId}
        list={seasons}
      />
    </div>
  );
};

SeasonsList.propTypes = {
  seriesId: PropTypes.string,
  seasons: PropTypes.array,
};

export default SeasonsList;
