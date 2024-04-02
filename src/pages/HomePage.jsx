import { useState, useEffect, useCallback, useMemo } from "react";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMediaData } from "../services/services.js";
import Footer from "../components/OverViewPage/Footer.jsx";
import { footerLinks } from "../data/data.js";
import "./HomePage.scss";
const HomePage = () => {
  const [displayMedia, setDisplayMedia] = useState({
    list: [],
    isLoading: true,
  });
  const path = window.location.pathname;

  const mediaTypeDetails = useMemo(() => {
    switch (path) {
      case "/home":
        return {
          mediaType: "movie",
          isHomePage: true,
        };
      case "/movies":
        return {
          mediaType: "movie",
          isHomePage: false,
        };
      case "/tv":
        return {
          mediaType: "tv",
          isHomePage: false,
        };
    }
  }, [path]);

  const fetchData = useCallback(async () => {
    const response = await fetchMediaData({
      mediaType: mediaTypeDetails.mediaType,
      mediaCategory: "popular",
    });
    setDisplayMedia({
      list: response.results,
      isLoading: false,
    });
  }, [mediaTypeDetails.mediaType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="homePage">
      <HomePageNavBar />

      <CurrentlyPlayingContent
        displayMoviesData={displayMedia.list}
        mediaType={mediaTypeDetails.mediaType}
        isLoading={displayMedia.isLoading}
      />
      {mediaTypeDetails.isHomePage ? (
        <>
          <MoviesCategories mediaType={"movie"} />
          <MoviesCategories mediaType={"tv"} />
        </>
      ) : (
        <MoviesCategories mediaType={mediaTypeDetails.mediaType} />
      )}
      <div className="footerWarpper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

export default HomePage;
