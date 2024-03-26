import "./ExplorePage.scss";
import { debounce } from "../utils/utilityFunctions.js";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategorywiseList from "../components/HomePage/CategorywiseList.jsx";

const ExplorePage = () => {
  const [movieDataAfterSerach, setMovieDataAfterSerach] = useState([]);
  const fetchData = useCallback(async (value) => {
    const res = await fetchDataBySearchQuery(value);
    if (res) {
      setMovieDataAfterSerach(res.results);
    }
  }, []);
  const handleDebounce = useCallback(debounce(fetchData, 500), [fetchData]);

  const handleSearch = useCallback(
    ({ target: { value } }) => {
      handleDebounce(value);
    },
    [handleDebounce]
  );
  return (
    <div className="explorePage">
      <div className="searchInputWrapper">
        <input
          type="search"
          name="search"
          id="search"
          onChange={handleSearch}
        />
      </div>
      {movieDataAfterSerach && (
        <CategorywiseList
          categoryTitle={"Search Results.."}
          data={movieDataAfterSerach}
        />
      )}
    </div>
  );
};

export default ExplorePage;
