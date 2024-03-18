import CategorywiseList from "../components/HomePage/CategorywiseList";
import CurrentlyPlayingContent from "../components/HomePage/CurrentlyPlayingContent";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <HomePageNavBar />
      <CurrentlyPlayingContent />
      <MoviesCategories />
    </div>
  );
};

export default HomePage;
