import { useState, useEffect, useCallback } from "react";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMediaData } from "../services/services.js";
import Footer from "../components/OverViewPage/Footer.jsx";
import { footerLinks } from "../data/data.js";
import "./HomePage.scss";
import PropTypes from "prop-types";
const HomePage = ({ mediaType = "movie", isHomePage = false }) => {
  const [displayMoviesData, setDisplayMoviesData] = useState({});
  const [isLoadingCurrentContent, setIsLoadingCurrentContent] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoadingCurrentContent(true);
    const res = await fetchMediaData({
      mediaType: mediaType,
      mediaCategory: "popular",
    });
    setDisplayMoviesData(res);
    setIsLoadingCurrentContent(false);
  }, [mediaType]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="homePage">
      <HomePageNavBar />

      <CurrentlyPlayingContent
        displayMoviesData={displayMoviesData.results}
        mediaType={mediaType}
        isLoading={isLoadingCurrentContent}
      />

      <MoviesCategories mediaType={mediaType} />
      {isHomePage && <MoviesCategories mediaType={"tv"} />}
      <div className="footerWarpper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  mediaType: PropTypes.string,
  isHomePage: PropTypes.bool,
};

export default HomePage;
