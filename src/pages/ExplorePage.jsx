import "./ExplorePage.scss";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategoryWiseList from "../components/HomePage/CategoryWiseList.jsx";
import CustomInputWithDeBouncing from "../UI/CustomInputWithDeBouncing.jsx";

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

  const handleSelectMediaTypeChange = ({ target: { value } }) => {
    setSelectedMediaType(value);
    fetchData(searchQuery, value);
  };

  return (
    <div className="explorePage">
      <div className="explorePageContentWrapper">
        <CustomInputWithDeBouncing
          type="search"
          id={"search"}
          floatingLabel="Search here.."
          updateState={fetchData}
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
          <>
            <h1>No Relevant Media Found </h1>
            <p style={{ color: "red" }}>Try to search something else... </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
