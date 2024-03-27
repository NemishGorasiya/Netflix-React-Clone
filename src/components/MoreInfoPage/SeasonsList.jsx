import CategorywiseList from "../HomePage/CategorywiseList";
import "./SeasonsList.scss";

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

export default SeasonsList;
