import { useState, useEffect, useCallback, useMemo } from "react";
import CarouselSlider from "../components/HomePage/CarouselSlider";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMediaData } from "../services/services.js";
import Footer from "../components/WelcomePage/Footer.jsx";
import { footerLinks } from "../data/data.jsx";
import "./HomePage.scss";
import Loader from "../components/Loader.jsx";
const HomePage = () => {
  const [displayMedia, setDisplayMedia] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = displayMedia;
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
  const { mediaType, isHomePage } = mediaTypeDetails;

  const fetchData = useCallback(async () => {
    const response = await fetchMediaData({
      mediaType: mediaType,
      mediaCategory: "popular",
    });
    setDisplayMedia({
      list: response.results,
      isLoading: false,
    });
  }, [mediaType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="homePage">
      <CarouselSlider
        displayMoviesData={list}
        mediaType={mediaType}
        isLoading={isLoading}
      />
      {isHomePage ? (
        <>
          <MoviesCategories mediaType={"movie"} />
          <MoviesCategories mediaType={"tv"} />
        </>
      ) : (
        <MoviesCategories mediaType={mediaType} />
      )}
      <div className="footerWrapper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

export default HomePage;
