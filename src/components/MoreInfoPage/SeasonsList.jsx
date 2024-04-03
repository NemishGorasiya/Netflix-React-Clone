import CategoryWiseList from "../HomePage/CategoryWiseList";
import PropTypes from "prop-types";

const SeasonsList = ({ moviesData, onClick }) => {
  return (
    <div className="seasonsList">
      <CategoryWiseList
        isSeasonList={true}
        categoryTitle={"ALL SEASONS"}
        moviesData={moviesData}
        mediaType={"tv"}
        onClick={onClick}
      />
    </div>
  );
};

SeasonsList.propTypes = {
  moviesData: PropTypes.array,
  onClick: PropTypes.func,
};

export default SeasonsList;
