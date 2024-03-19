import { useState, useEffect } from "react";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import { fetchMovies } from "../utils/http";
import Footer from "../components/Footer.jsx";
import { footerLinks } from "../data/data.js";
import "./HomePage.scss";

const HomePage = () => {
  const [currentMovieData, setCurrentMovieData] = useState({});
  const changeCurrrentMovieData = (currentMovie) => {
    setCurrentMovieData(currentMovie);
  };
  return (
    <div className="homePage">
      <HomePageNavBar />
      <CurrentlyPlayingContent currentMovieData={currentMovieData} />
      <MoviesCategories changeCurrrentMovieData={changeCurrrentMovieData} />
      <div className="footerWarpper">
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

export default HomePage;
