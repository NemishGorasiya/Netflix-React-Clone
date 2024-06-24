import { useLocation } from "react-router-dom";
import CarouselSlider from "../components/HomePage/CarouselSlider";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import Footer from "../components/WelcomePage/Footer.jsx";
import { MEDIA_TYPES, footerLinks } from "../constants/constants.js";
import "./HomePage.scss";
import { getMediaType } from "../utils/utilityFunctions.js";

const HomePage = () => {
  // const path = window.location.pathname;
  const location = useLocation();
  const path = location.pathname;

  const mediaType = getMediaType(path);
  //   const isHomePage = path === "/home";
  //   const mediaType = isHomePage ? "movie" : path === "/movies" ? "movie" : "tv";

  return (
    <div className="homePage">
      <CarouselSlider mediaType={mediaType} />
      {path === "/home" ? (
        <>
          <MoviesCategories mediaType={MEDIA_TYPES.MOVIE} />
          <MoviesCategories mediaType={MEDIA_TYPES.TV} />
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
