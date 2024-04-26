import { Link } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import { getImagePath, handleFallBackImage } from "../utils/utilityFunctions";
import "./MediaGallery.scss";
import NoMediaFound from "../assets/No_Movie_Found.png";
import PropTypes from "prop-types";

const MediaGallery = ({ list, fetchMoreData, isLoading }) => {
  return (
    <div className="moviesGalleryWrapper">
      {!isLoading && list.length === 0 ? (
        <div className="fallbackImageWrapper">
          <img
            src={NoMediaFound}
            alt="No media found"
            className="fallbackImage"
          />
          <h1 className="fallbackText">No Media found</h1>
        </div>
      ) : (
        <InfiniteScroll
          items={list}
          fetchMoreData={fetchMoreData}
          renderItem={renderItem}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

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

MediaGallery.propTypes = {
  list: PropTypes.array,
  fetchMoreData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default MediaGallery;
