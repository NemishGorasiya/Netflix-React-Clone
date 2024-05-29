import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import No_Movie_Found from "../assets/No_Movie_Found.png";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import InfiniteScroll from "../components/common/InfiniteScroll.jsx";
import {
  fetchDataBySearchQuery,
  fetchMediaData,
} from "../services/services.js";
import {
  debounce,
  getImagePath,
  handleFallBackImage,
} from "../utils/utilityFunctions.js";
import "./ExplorePage.scss";
import CustomInput from "../components/common/CustomInput.jsx";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamMediaType = searchParams.get("mediaType") || "movie";

  const fetchData = useCallback(
    async ({ pageNumber, abortController }) => {
      try {
        setMovies((prevMovies) => ({ ...prevMovies, isLoading: true }));
        let res;
        const mediaTypeParam = searchParams.get("mediaType");
        const mediaCategoryParam = searchParams.get("category");
        const searchParam = searchParams.get("search");

        if (searchParam !== undefined && searchParam !== null) {
          res = await fetchDataBySearchQuery({
            searchQuery: searchParam,
            mediaType: mediaTypeParam,
            pageNumber: pageNumber,
          });
        } else if (
          mediaCategoryParam !== undefined &&
          mediaCategoryParam !== null
        ) {
          res = await fetchMediaData({
            mediaType: mediaTypeParam,
            mediaCategory: mediaCategoryParam,
            pageNumber,
            abortController,
          });
        }
        if (res && res.results) {
          setMovies((prevMovies) => ({
            list: [...prevMovies.list, ...res.results],
            hasMore: prevMovies.pageNumber < res.total_pages,
            isLoading: false,
            pageNumber: prevMovies.pageNumber + 1,
          }));
        } else {
          setMovies((prevMovies) => ({
            ...prevMovies,
            list: [],
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
      fetchData({ pageNumber });
    }
  }, [hasMoreData, fetchData, pageNumber]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    debounce((value) => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("search", value);
      newSearchParams.set("mediaType", selectedMediaType);
      setSearchParams(newSearchParams);
    }),
    [fetchData]
  );

  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      setSearchQuery(value);
      if (value === "") {
        return;
      }
      handleDebounce(value);
    },
    [handleDebounce]
  );

  const handleSelectMediaTypeChange = ({ target: { value } }) => {
    setSelectedMediaType(value);
    setSearchParams((searchParams) => {
      searchParams.set("mediaType", value);
      return searchParams;
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData({ abortController });
    setMovies({
      list: [],
      pageNumber: 1,
      isLoading: false,
      hasMore: true,
    });
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
            value={searchQuery}
          />
          <div className="mediaTypeSelectContainer">
            Search In
            <div className="radioInputWrapper">
              <input
                type="radio"
                value="movie"
                name="mediaType"
                id="movie"
                checked={searchParamMediaType === "movie"}
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
                checked={searchParamMediaType === "tv"}
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
            mediaType={searchParamMediaType}
            isLoading={isLoading}
          />
        </div>

        {!isLoading && movieList?.length === 0 && (
          <div className="fallBackText">
            <img src={No_Movie_Found} alt="No_Movie_Found" />
            <h1>No Relevant Media Found </h1>
            <p>Try to search something else... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
