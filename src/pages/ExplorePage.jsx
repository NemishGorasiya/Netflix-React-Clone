import "./ExplorePage.scss";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategorywiseList from "../components/HomePage/CategorywiseList.jsx";
import CustomInputWithDeBouncing from "../UI/CustomInputWithDeBouncing.jsx";
import HomePageNavBar from "../components/HomePage/HomePageNavBar.jsx";

const ExplorePage = () => {
  const [movieDataAfterSerach, setMovieDataAfterSerach] = useState([]);
  const fetchData = useCallback(async (value) => {
    if (value === "") {
      return;
    }
    const res = await fetchDataBySearchQuery(value);
    if (res) {
      setMovieDataAfterSerach(res.results);
    } else {
      setMovieDataAfterSerach([]);
    }
  }, []);

  return (
    <div className="explorePage">
      <HomePageNavBar />
      <div className="explorePageContentWrapper">
        <CustomInputWithDeBouncing
          type="search"
          id={"search"}
          floatingLabel="Search here.."
          updateState={fetchData}
        />
        {movieDataAfterSerach && (
          <CategorywiseList
            categoryTitle={"Search Results.."}
            moviesData={movieDataAfterSerach}
          />
        )}
        {movieDataAfterSerach.length === 0 && <h1>No Media Found :( </h1>}
      </div>
    </div>
  );
};

export default ExplorePage;
