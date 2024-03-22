import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import "./MyWatchList.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import { addToFavorite } from "../services/services";

const MyWatchList = () => {
  const watchListCategories = ["movies", "tv"];
  return (
    <div className="myWatchListPage">
      <HomePageNavBar />
      <div className="categoryWrapper">
        {watchListCategories.map((watchListCategory) => (
          <CategorywiseList
            key={watchListCategory}
            isWatchList
            watchListCategory={watchListCategory}
            isDeletable
          />
        ))}
      </div>
    </div>
  );
};

export default MyWatchList;
