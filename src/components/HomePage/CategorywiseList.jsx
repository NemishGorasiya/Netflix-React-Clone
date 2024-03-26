import { useState } from "react";
import "./CategorywiseList.scss";
import Slider from "./Slider";

const CategorywiseList = ({
  categoryTitle,
  moviesData,
  isDeletable = false,
  removeFromList,
  mediaType,
  isSeasonList,
  style,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);

  const handleViewAllClick = () => {
    setIsViewAll((prev) => !prev);
  };

  // const handleRemoveFromWatchList = async ({
  //   media_id,
  //   media_type,
  //   addingOrRemoving,
  // }) => {
  //   const res = await addToWatchList({
  //     sessionID: loggedInUser.sessionID,
  //     media_id: media_id,
  //     media_type: media_type,
  //     addingOrRemoving: addingOrRemoving,
  //   });
  //   // if (res) {
  //   //   fetchData();
  //   // }
  // };
  // const handleRemoveFromFavorite = async ({
  //   media_id,
  //   media_type,
  //   addingOrRemoving,
  // }) => {
  //   const res = await addToFavorite({
  //     sessionID: loggedInUser.sessionID,
  //     media_id: media_id,
  //     media_type: media_type,
  //     addingOrRemoving: addingOrRemoving,
  //   });
  //   // if (res) {
  //   //   fetchData();
  //   // }
  // };

  return (
    <div className="categoryWiseList" style={style}>
      <div className="categoryHeader">
        <h3 className="categoryHeading">{categoryTitle}</h3>
        {moviesData && moviesData.length !== 0 && (
          <p className="viewAll" onClick={handleViewAllClick}>
            View {isViewAll ? "Less" : "More"}
          </p>
        )}
      </div>
      {moviesData && moviesData.length !== 0 && (
        <Slider
          isViewAll={isViewAll}
          moviesData={moviesData}
          isDeletable={isDeletable}
          removeFromList={removeFromList}
          mediaType={mediaType}
          isSeasonList={isSeasonList}
        />
      )}
      {!moviesData && <h1 style={{ color: "#fff" }}>Oops nothing to show</h1>}
    </div>
  );
};

export default CategorywiseList;
