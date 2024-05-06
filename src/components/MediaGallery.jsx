import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import posterFallBackImage from "../assets/posterNotFound.jpg";
import { getImagePath, handleFallBackImage } from "../utils/utilityFunctions";
import "./MediaGallery.scss";
import NoMediaFound from "../assets/No_Movie_Found.png";
import PropTypes from "prop-types";

const MediaGallery = ({
  list,
  fetchMoreData,
  isLoading,
  removeFromList,
  listType,
  mediaType,
}) => {
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
          listType={listType}
          removeFromList={removeFromList}
          mediaType={mediaType}
        />
      )}
    </div>
  );
};

const renderItem = ({
  id,
  poster_path,
  still_path,
  backdrop_path,
  rating,
  removeFromList,
  listType,
  mediaType,
  episode_number,
  season_number,
  show_id,
}) => {
  return (
    <div className="mediaPosterWrapper">
      <Link
        to={`${
          mediaType === "episodes"
            ? `/tv/moreInfo?id=${show_id}&season=${season_number}&episode=${episode_number}`
            : `/${mediaType}/moreInfo?id=${id}`
        }`}
      >
        <img
          className="mediaImagePoster"
          src={
            poster_path || still_path || backdrop_path
              ? getImagePath(poster_path || still_path || backdrop_path)
              : posterFallBackImage
          }
          alt="image"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            handleFallBackImage(event, posterFallBackImage);
          }}
        />
      </Link>
      {(listType === "watchlist" || listType === "favorite") && (
        <div
          className="removeBtn"
          onClick={(event) => {
            removeFromList({ event, mediaId: id });
          }}
        >
          <i className="fa-solid fa-xmark" />
        </div>
      )}
      {listType === "rated" && rating && (
        <div className="rating">{rating.toFixed(1)}</div>
      )}
    </div>
  );
};

MediaGallery.propTypes = {
  list: PropTypes.array,
  fetchMoreData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default MediaGallery;
