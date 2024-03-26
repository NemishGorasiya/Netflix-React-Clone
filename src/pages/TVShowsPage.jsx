import { useEffect } from "react";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import "./TVShowsPage.scss";

const TVShowsPage = () => {
  const fetchTVSeriesData = () => {};
  useEffect(() => {
    fetchTVSeriesData();
  }, []);
  return (
    <div className="tvShowsPage">
      <HomePageNavBar />
      <div className="tvShowsWrapper">wdfghjkl</div>
    </div>
  );
};

export default TVShowsPage;
