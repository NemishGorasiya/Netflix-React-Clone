import CategoryWiseList from "../HomePage/CategoryWiseList";
import PropTypes from "prop-types";

const SeasonsList = ({ seriesId }) => {
  return (
    <div className="seasonsList">
      <CategoryWiseList
        isSeasonList={true}
        categoryTitle={"ALL SEASONS"}
        mediaType={"tv"}
        seriesId={seriesId}
      />
    </div>
  );
};

SeasonsList.propTypes = {
  seriesId: PropTypes.string,
};

export default SeasonsList;
