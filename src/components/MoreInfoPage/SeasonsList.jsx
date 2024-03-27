import CategorywiseList from "../HomePage/CategorywiseList";
import "./SeasonsList.scss";
import PropTypes from "prop-types";

const SeasonsList = ({ moviesData, onClick }) => {
  return (
    <div className="seasonsList">
      <CategorywiseList
        style={{ margin: "30px 0", fontSize: "21px" }}
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
