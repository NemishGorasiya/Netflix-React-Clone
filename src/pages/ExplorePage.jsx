import "./ExplorePage.scss";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategoryWiseList from "../components/HomePage/CategoryWiseList.jsx";
import CustomInput from "../UI/CustomInput.jsx";
import { debounce } from "../utils/utilityFunctions.js";

const ExplorePage = () => {
  const [movieList, setMovieList] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(
    async (value, mediaType) => {
      setSearchQuery(value);
      if (value === "") {
        return;
      }
      const res = await fetchDataBySearchQuery({
        searchQuery: value,
        media_type: mediaType ?? selectedMediaType,
      });
      if (res) {
        setMovieList(res.results);
      } else {
        setMovieList([]);
      }
    },
    [selectedMediaType]
  );

  const handleDebounce = useCallback(
    debounce((value) => {
      fetchData(value);
    }),
    [fetchData]
  );

  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      setSearchQuery(value);
      handleDebounce(value);
    },
    [handleDebounce]
  );

  const handleSelectMediaTypeChange = ({ target: { value } }) => {
    setSelectedMediaType(value);
    fetchData(searchQuery, value);
  };

  return (
    <div className="explorePage">
      <div className="explorePageContentWrapper">
        <CustomInput
          type="search"
          id={"search"}
          floatingLabel="Search here.."
          onChange={handleInputChange}
          val={searchQuery}
        />
        <div className="mediaTypeSelectContainer">
          Search In
          <div className="radioInputWrapper">
            <input
              type="radio"
              value="movie"
              name="mediaType"
              id="movie"
              checked={selectedMediaType === "movie"}
              onChange={handleSelectMediaTypeChange}
            />
            <label htmlFor="movie">Movies</label>
          </div>
          <div className="radioInputWrapper">
            <input
              type="radio"
              value="tv"
              name="mediaType"
              id="tv"
              checked={selectedMediaType === "tv"}
              onChange={handleSelectMediaTypeChange}
            />
            <label htmlFor="tv">TVs</label>
          </div>
        </div>
        {movieList && movieList.length > 0 && (
          <CategoryWiseList
            categoryTitle={"Search Results"}
            moviesData={movieList}
            mediaType={selectedMediaType}
          />
        )}
        {movieList && movieList.length === 0 && (
          <div className="fallBackText">
            <h1>No Relevant Media Found </h1>
            <p>Try to search something else... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
