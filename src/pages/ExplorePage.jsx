import "./ExplorePage.scss";
import { useCallback, useState } from "react";
import { fetchDataBySearchQuery } from "../services/services.js";
import CategoryWiseList from "../components/HomePage/CategoryWiseList.jsx";
import CustomInput from "../UI/CustomInput.jsx";
import {
  debounce,
  getImagePath,
  handleFallBackImage,
} from "../utils/utilityFunctions.js";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import { Link } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll.jsx";

const renderItem = ({ id, poster_path, mediaType }) => (
  <Link key={id} to={`/${mediaType}/moreInfo?id=${id}`}>
    <div className="movieCard">
      <img
        className="posterImage"
        src={poster_path ? getImagePath(poster_path) : posterFallBackImage}
        alt="image"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          handleFallBackImage(event, posterFallBackImage);
        }}
      />
    </div>
  </Link>
);

const ExplorePage = () => {
  const [movies, setMovies] = useState({
    list: [],
    pageNumber: 1,
    isLoading: false,
    hasMore: false,
  });
  const {
    list: movieList,
    pageNumber,
    isLoading,
    hasMore: hasMoreData,
  } = movies;
  const [selectedMediaType, setSelectedMediaType] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(
    async ({ searchQuery: query, mediaType }) => {
      setMovies((prevMovies) => ({ ...prevMovies, isLoading: true }));

      const res = await fetchDataBySearchQuery({
        searchQuery: query,
        media_type: mediaType,
        pageNumber: pageNumber,
      });

      console.log("res :", res);

      if (res) {
        setMovies((prevMovies) => ({
          list: [...prevMovies.list, ...res.results],
          hasMore: pageNumber < res.total_pages,
          isLoading: false,
          pageNumber: prevMovies.pageNumber + 1,
        }));
      }
    },
    [pageNumber]
  );

  const fetchMoreData = useCallback(() => {
    if (hasMoreData && !isLoading) {
      fetchData({ searchQuery: searchQuery, mediaType: selectedMediaType });
    }
  }, [hasMoreData, isLoading, fetchData, searchQuery, selectedMediaType]);

  const handleDebounce = useCallback(
    debounce((value) => {
      fetchData({ searchQuery: value, mediaType: selectedMediaType });
    }),
    [fetchData]
  );

  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      setSearchQuery(value);
      handleDebounce(value);
      setMovies({
        list: [],
        pageNumber: 1,
        isLoading: false,
        hasMore: false,
      });
    },
    [handleDebounce]
  );

  const handleSelectMediaTypeChange = ({ target: { value } }) => {
    setSelectedMediaType(value);
    fetchData({ searchQuery, value });
  };

  console.log("render");

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
        <div className="moviesGalleryWrapper">
          {/* {isLoading ? (
            <h1>Loading...</h1>
          ) : ( */}
          <InfiniteScroll
            items={movieList}
            fetchMoreData={fetchMoreData}
            renderItem={renderItem}
            mediaType={selectedMediaType}
            loader={<h1>Loading...</h1>}
            isLoading={isLoading}
          />
          {/* )} */}
        </div>

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
