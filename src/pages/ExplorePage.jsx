import "./ExplorePage.scss";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategorywiseList from "../components/HomePage/CategorywiseList.jsx";
import CustomInputWithDeBouncing from "../UI/CustomInputWithDeBouncing.jsx";
import HomePageNavBar from "../components/HomePage/HomePageNavBar.jsx";

const ExplorePage = () => {
  const [movieDataAfterSerach, setMovieDataAfterSerach] = useState([]);
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
        setMovieDataAfterSerach(res.results);
      } else {
        setMovieDataAfterSerach([]);
      }
    },
    [selectedMediaType]
  );

  const handleSelectMediaTypeChange = (event) => {
    setSelectedMediaType(event.target.value);
    fetchData(searchQuery, event.target.value);
  };

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
        {movieDataAfterSerach && movieDataAfterSerach.length > 0 && (
          <CategorywiseList
            categoryTitle={"Search Results"}
            moviesData={movieDataAfterSerach}
            mediaType={selectedMediaType}
          />
        )}
        {movieDataAfterSerach.length === 0 && (
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
