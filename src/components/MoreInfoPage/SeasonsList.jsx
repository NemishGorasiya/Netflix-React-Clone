import CategorywiseList from "../HomePage/CategorywiseList";
import "./SeasonsList.scss";

const SeasonsList = ({ moviesData }) => {
  return (
    <div className="seasonsList">
      <CategorywiseList
        style={{ margin: "30px 0", fontSize: "21px" }}
        isSeasonList={true}
        categoryTitle={"ALL SEASONS"}
        moviesData={moviesData}
      />
    </div>
  );
};

export default SeasonsList;
