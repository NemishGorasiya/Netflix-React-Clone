import "./MyFavoritePage.scss";
import CategorywiseList from "../components/HomePage/CategorywiseList";
import HomePageNavBar from "../components/HomePage/HomePageNavBar";

const MyFavoritePage = () => {
  const favoriteCategories = ["movies", "tv"];
  return (
    <div className="myFavoritePage">
      <HomePageNavBar />
      <div className="categoryWrapper">
        {favoriteCategories.map((favoriteCategory) => (
          <CategorywiseList
            key={favoriteCategory}
            isFavoriteList
            favoriteCategory={favoriteCategory}
            isDeletable
          />
        ))}
      </div>
    </div>
  );
};

export default MyFavoritePage;
