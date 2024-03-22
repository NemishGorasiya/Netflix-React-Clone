import "./ExplorePage.scss";
import { debounce } from "../utils/utilityFunctions.js";
import { useCallback } from "react";

const ExplorePage = () => {
  const fetchData = useCallback(async (value) => {
    const res = await fetchDataBySearchQuery(value);
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
    </div>
  );
};

export default ExplorePage;
