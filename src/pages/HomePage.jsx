import { useState, useEffect, useCallback } from "react";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMediaData } from "../services/services.js";
import Footer from "../components/Footer.jsx";
import { footerLinks } from "../data/data.js";
import "./HomePage.scss";
import PropTypes from "prop-types";

const HomePage = ({ mediaType = "movie" }) => {
  const [displayMoviesData, setDisplayMoviesData] = useState({});

  const fetchData = useCallback(async () => {
    const res = await fetchMediaData({
      mediaType: mediaType,
      mediaCategory: "popular",
    });
    setDisplayMoviesData(res);
  }, [mediaType]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="homePage">
      <HomePageNavBar />
      {displayMoviesData.results && (
        <CurrentlyPlayingContent
          displayMoviesData={displayMoviesData.results}
          mediaType={mediaType}
        />
      )}
      <MoviesCategories mediaType={mediaType} />
      <div className="footerWarpper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  mediaType: PropTypes.string,
};

export default HomePage;
