import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Button from "../UI/Button";
import CustomModal from "../UI/CustomModal";
import RatingStars from "../UI/RatingStars";
import Rating from "../UI/Rating";
import TvSeasonsWrapper from "../components/MoreInfoPage/TvSeasonsWrapper";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import CastProfileCardSkeleton from "../components/MoreInfoPage/CastProfileCardSkeleton";
import {
  fetchMoreInfoOfMedia,
  submitMediaRating,
  updateUserPreferencesList,
} from "../services/services";
import { AuthContext } from "../context/AuthContext";
import { formatDate, getImagePath } from "../utils/utilityFunctions";
import "./MoreInfoAboutMoviePage.scss";

const MoreInfoAboutMoviePage = ({ mediaType }) => {
  const { loggedInUser } = useContext(AuthContext);
  const { sessionID } = loggedInUser;
  const [moreInfoOfMedia, setMoreInfoOfMedia] = useState({
    data: {},
    isLoading: true,
  });

  const [userPreferenceStatus, setUserPreferenceStatus] = useState({
    watchlist: { isAdded: false, isLoading: false },
    favorite: { isAdded: false, isLoading: false },
  });

  const {
    watchlist: {
      isAdded: isAddedToWatchList,
      isLoading: isUpdatingWatchListLoading,
    },
    favorite: {
      isAdded: isAddedToFavorite,
      isLoading: isUpdatingFavoriteLoading,
    },
  } = userPreferenceStatus;

  const [isAddRatingModalOpen, setIsAddRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(8);

  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("id");
  const seasonNumber = searchParams.get("season");
  const episodeNumber = searchParams.get("episode");

  const handleRatingChange = ({ target: { value } }) => {
    setRating(value);
  };

  const handleCloseMyCustomModal = useCallback(() => {
    setIsAddRatingModalOpen(false);
  }, []);

  const handleAddRating = () => {
    setIsAddRatingModalOpen(true);
  };

  const fetchMovieData = useCallback(
    async ({ abortController }) => {
      const response = await fetchMoreInfoOfMedia({
        mediaId: mediaId,
        mediaType: mediaType,
        isEpisode: episodeNumber,
        seasonNumber: seasonNumber,
        episodeNumber: episodeNumber,
        abortController,
      });
      setMoreInfoOfMedia({
        data: response,
        isLoading: false,
      });
    },
    [episodeNumber, mediaId, mediaType, seasonNumber]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchMovieData({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchMovieData]);

  const addToUserPreferencesList = async ({ listType }) => {
    try {
      let isAdding;
      if (userPreferenceStatus[listType].isAdded) {
        isAdding = false;
      } else {
        isAdding = true;
      }
      setUserPreferenceStatus((prevStatus) => ({
        ...prevStatus,
        [listType]: {
          ...prevStatus[listType],
          isLoading: true,
        },
      }));
      const res = await updateUserPreferencesList({
        sessionID,
        mediaId: moreInfoOfMedia.data.id,
        isAdding,
        mediaType,
        listType,
      });
      if (res.success) {
        toast.success(
          `The item/record ${
            isAdding ? "Added into" : "Removed from"
          } your ${listType} successfully.`
        );
        setUserPreferenceStatus((prevStatus) => ({
          ...prevStatus,
          [listType]: {
            ...prevStatus[listType],
            isAdded: !prevStatus[listType].isAdded,
          },
        }));
      } else {
        toast.error(res.status_message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUserPreferenceStatus((prevStatus) => ({
        ...prevStatus,
        [listType]: {
          ...prevStatus[listType],
          isLoading: false,
        },
      }));
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    try {
      const res = await submitMediaRating({
        mediaType: mediaType,
        rating: rating,
        mediaId: moreInfoOfMedia.data.id,
        sessionID: loggedInUser.sessionID,
        isEpisode: episodeNumber,
        seasonNumber: seasonNumber,
        episodeNumber: episodeNumber,
      });
      if (res.success) {
        toast.success("Rating submitted successfully");
        setIsAddRatingModalOpen(false);
      } else {
        toast.error(res.status_message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    credits,
    seasons,
    vote_count,
    vote_average,
    overview,
    genres,
    release_date,
    first_air_date,
    name,
    title,
    still_path,
    poster_path,
    backdrop_path,
    runtime,
    number_of_episodes,
    number_of_seasons,
    air_date,
  } = moreInfoOfMedia.data || {};
  const { isLoading } = moreInfoOfMedia;

  const runTimeHours = parseInt(runtime / 60);
  const runTimeMinutes = runtime - runTimeHours * 60;

  return (
    <div className="moreInfoPage">
      <div
        className="moviePoster"
        style={{
          background: `linear-gradient(to right,black 0% ,transparent 100%) , url(${getImagePath(
            backdrop_path ?? poster_path ?? still_path
          )})`,
        }}
      >
        <h1 className="movieTitle">{title ?? name}</h1>
      </div>
      <div className="movieDetailsWrapper">
        <div className="functionBtns">
          <div className="leftBtns">
            <Button
              className={"btn playBtn"}
              iconClassName={"fa-solid fa-play"}
              text={"Play"}
            />
          </div>
          <div className="rightBtns">
            {!episodeNumber && (
              <>
                <Button
                  className="btn"
                  iconClassName={`fa-regular fa-bookmark ${
                    isAddedToWatchList && "fa-solid"
                  }`}
                  text={"WatchList"}
                  disabled={isUpdatingWatchListLoading}
                  onClick={() => {
                    addToUserPreferencesList({ listType: "watchlist" });
                  }}
                />
                <Button
                  className="btn"
                  iconClassName={`fa-regular fa-thumbs-up ${
                    isAddedToFavorite && "fa-solid"
                  }`}
                  disabled={isUpdatingFavoriteLoading}
                  text={"Favorite"}
                  onClick={() => {
                    addToUserPreferencesList({ listType: "favorite" });
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="aboutMovie">
          <p className="movieDetails">
            <span className="releaseYear">
              {release_date || first_air_date || air_date
                ? formatDate(release_date || first_air_date || air_date)
                : ""}
            </span>
            {runtime && (
              <span className="movieLength">
                {"| "} {runTimeHours}h {runTimeMinutes}m
              </span>
            )}
            <span className="movieVideoQuality">HD</span>
          </p>
          <p className="movieDetails">
            {number_of_seasons && (
              <span className="movieLength">
                {number_of_seasons} Seasons &nbsp;{" "}
                {number_of_seasons && number_of_episodes && "•"}
              </span>
            )}
            {number_of_episodes && (
              <span className="releaseYear">{number_of_episodes} Episodes</span>
            )}
          </p>
          {genres && (
            <p className="movieGenres">
              {genres.map((genre, idx) => (
                <span key={genre.id}>
                  {genre.name} {idx === genres.length - 1 ? "" : "| "}
                </span>
              ))}
            </p>
          )}
          <div className="movieDescription">{overview}</div>
          <div className="movieRating">
            <Rating
              rating={vote_average ? vote_average.toFixed(2) : "0.0"}
              ratingCount={vote_count}
            />
            <Button
              className="rateNowBtn"
              text={"Rate Now"}
              onClick={handleAddRating}
            />
          </div>
        </div>
        {mediaType === "tv" && seasons && (
          <TvSeasonsWrapper mediaId={mediaId} />
        )}
        {isLoading ? (
          <CastProfileCardSkeleton />
        ) : (
          credits?.cast.length > 0 && <MovieCasts castsInfo={credits.cast} />
        )}
      </div>
      {isAddRatingModalOpen && (
        <CustomModal handleCloseMyCustomModal={handleCloseMyCustomModal}>
          <form className="submitReviewForm" onSubmit={submitReview}>
            <div className="inputWrapper">
              <label htmlFor="mediaName">Media Name</label>
              <input
                className="readOnly"
                type="text"
                id="mediaName"
                value={title ?? name}
                readOnly
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="mediaRating">Your Rating out of 10</label>
              <div className="ratingsWrapper">
                <RatingStars value={rating} onChange={handleRatingChange} />
              </div>
            </div>
            <div className="submitReviewWrapper">
              <Button text="Submit Review" type="submit" />
            </div>
          </form>
        </CustomModal>
      )}
    </div>
  );
};

MoreInfoAboutMoviePage.propTypes = {
  mediaType: PropTypes.string,
};

export default MoreInfoAboutMoviePage;
