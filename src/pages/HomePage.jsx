import { useState, useEffect, useCallback } from "react";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMovies } from "../services/services.js";
import Footer from "../components/Footer.jsx";
import { footerLinks } from "../data/data.js";
import "./HomePage.scss";

const HomePage = () => {
  const [displayMoviesData, setDisplayMoviesData] = useState({});

  const fetchData = useCallback(async () => {
    const res = await fetchMovies({ movieCategory: "popular" });
    setDisplayMoviesData(res);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="homePage">
      <HomePageNavBar />
      {displayMoviesData.results && (
        <CurrentlyPlayingContent
          displayMoviesData={displayMoviesData.results}
        />
      )}
      <MoviesCategories />
      <div className="footerWarpper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

export default HomePage;
