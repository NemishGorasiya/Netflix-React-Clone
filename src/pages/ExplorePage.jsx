import "./ExplorePage.scss";
import { useCallback, useEffect, useState } from "react";
import {
  fetchDataBySearchQuery,
  fetchMediaData,
} from "../services/services.js";
import CustomInput from "../UI/CustomInput.jsx";
import {
  debounce,
  getImagePath,
  handleFallBackImage,
} from "../utils/utilityFunctions.js";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import InfiniteScroll from "../components/InfiniteScroll.jsx";
import No_Movie_Found from "../assets/No_Movie_Found.png";
import Loader from "../components/Loader.jsx";

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
    hasMore: true,
  });
  const {
    list: movieList,
    pageNumber,
    isLoading,
    hasMore: hasMoreData,
  } = movies;
  const [selectedMediaType, setSelectedMediaType] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const fetchData = useCallback(
    async ({ pageNumber, searchQuery: query, mediaType, abortController }) => {
      try {
        setMovies((prevMovies) => ({ ...prevMovies, isLoading: true }));
        let res;
        const mediaTypeParam = searchParams.get("mediaType");
        const mediaCategoryParam = searchParams.get("category");

        if (mediaTypeParam && mediaCategoryParam) {
          res = await fetchMediaData({
            mediaType: mediaTypeParam,
            mediaCategory: mediaCategoryParam,
            pageNumber,
            abortController,
          });
        } else {
          res = await fetchDataBySearchQuery({
            searchQuery: query,
            media_type: mediaType,
            pageNumber: pageNumber,
          });
        }
        if (res) {
          setMovies((prevMovies) => ({
            list: [...prevMovies.list, ...res.results],
            hasMore: prevMovies.pageNumber < res.total_pages,
            isLoading: false,
            pageNumber: prevMovies.pageNumber + 1,
          }));
        } else {
          setMovies((prevMovies) => ({
            ...prevMovies,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [searchParams]
  );

  const fetchMoreData = useCallback(() => {
    if (hasMoreData) {
      fetchData({
        pageNumber,
        searchQuery: searchQuery,
      });
    }
  }, [hasMoreData, fetchData, searchQuery, pageNumber]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    debounce((value) => {
      if (value) {
        console.log("val", value);
        fetchData({
          pageNumber,
          searchQuery: value,
        });
      }
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

  useEffect(() => {
    const abortController = new AbortController();

    fetchData({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  return (
    <div className="explorePage">
      <div className="explorePageContentWrapper">
        <div className="stickyContent">
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
        </div>

        <div className="moviesGalleryWrapper">
          <InfiniteScroll
            items={movieList}
            fetchMoreData={fetchMoreData}
            renderItem={renderItem}
            mediaType={selectedMediaType}
            isLoading={isLoading}
          />
        </div>

        {!isLoading && movieList && movieList.length === 0 && (
          <div className="fallBackText">
            <img src={No_Movie_Found} alt="" />
            <h1>No Relevant Media Found </h1>
            <p>Try to search something else... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
