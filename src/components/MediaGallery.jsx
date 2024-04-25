import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import { getImagePath, handleFallBackImage } from "../utils/utilityFunctions";
import "./MediaGallery.scss";

const renderItem = ({ poster_path }) => (
  <Link to={"/home"}>
    <div className="mediaPosterWrapper">
      <img
        className="mediaImagePoster"
        src={poster_path ? getImagePath(poster_path) : posterFallBackImage}
        alt="image"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          handleFallBackImage(event, posterFallBackImage);
        }}
      />
    </div>
  </Link>
);

const MediaGallery = ({ list, fetchMoreData, isLoading }) => {
  return (
    <div className="moviesGalleryWrapper">
      <InfiniteScroll
        items={list}
        fetchMoreData={fetchMoreData}
        renderItem={renderItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MediaGallery;
