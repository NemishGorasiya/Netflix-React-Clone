import { useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import RoundButton from "../UI/RoundButton";
import "./MoreInfoAboutMoviePage.scss";
import Rating from "../UI/Rating";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import CustomModal from "../UI/CustomModal";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchEpisodes,
  fetchMoreInfoOfMedia,
  submitMediaRating,
  updateUserPreferencesList,
} from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import SeasonsList from "../components/MoreInfoPage/SeasonsList";
import SeasonEpisodes from "../components/MoreInfoPage/SeasonEpisodes";
import PropTypes from "prop-types";
import CastProfileCardSkeleton from "../components/MoreInfoPage/CastProfileCardSkeleton";
import { formatDate, getImagePath, getYear } from "../utils/utilityFunctions";
import RatingStars from "../UI/RatingStars";

const MoreInfoAboutMoviePage = ({ mediaType }) => {
  const [seasonDetails, setSeasonDetails] = useState({
    seasonEpisodes: [],
    currSeasonName: "",
    currSeasonNumber: -1,
  });
  const { seasonEpisodes, currSeasonName, currSeasonNumber } = seasonDetails;
  const [moreInfoOfMedia, setMoreInfoOfMedia] = useState({
    list: {},
    isLoading: true,
  });
  const { list, isLoading } = moreInfoOfMedia;
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
    id,
    runtime,
    number_of_episodes,
    number_of_seasons,
    air_date,
  } = list || {};
  const [isAddRatingModalOpen, setIsAddRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(8);
  const handleRatingChange = ({ target: { value } }) => {
    setRating(value);
  };
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  const { sessionID } = loggedInUser;

  const [searchParams] = useSearchParams();
  const mediaId = searchParams.get("id");
  const seasonNumber = searchParams.get("season");
  const episodeNumber = searchParams.get("episode");

  const handleSeasonPosterClick = useCallback(async () => {
    const response = await fetchEpisodes({
      mediaId: mediaId,
      mediaType: mediaType,
      seasonNumber: seasonNumber,
    });
    const { episodes, name, season_number } = response;
    setSeasonDetails({
      seasonEpisodes: episodes,
      currSeasonName: name,
      currSeasonNumber: season_number,
    });
  }, [mediaId, mediaType, seasonNumber]);

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
        list: response,
        isLoading: false,
      });
    },
    [episodeNumber, mediaId, mediaType, seasonNumber]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchMovieData({ abortController: abortController });
    if (seasonNumber) {
      handleSeasonPosterClick();
    }
    return () => {
      abortController.abort();
    };
  }, [fetchMovieData, handleSeasonPosterClick, seasonNumber]);

  const runTimeHours = parseInt(runtime / 60);
  const runTimeMinutes = runtime - runTimeHours * 60;

  const addToUserPreferencesList = async ({ listType }) => {
    const res = await updateUserPreferencesList({
      sessionID,
      mediaId: id,
      isAdding: true,
      mediaType,
      listType,
    });
    if (res.success) {
      toast.success("The item/record added into your favorite successfully.");
    } else {
      toast.error(res.status_message);
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    try {
      const res = await submitMediaRating({
        mediaType: mediaType,
        rating: rating,
        mediaId: mediaId,
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
            {!episodeNumber && (
              <>
                <RoundButton
                  onClick={() => {
                    addToUserPreferencesList({ listType: "watchlist" });
                  }}
                  iconClassName="fa-solid fa-circle-plus"
                  title={"Add To WatchList"}
                />
                <RoundButton
                  onClick={() => {
                    addToUserPreferencesList({ listType: "favorite" });
                  }}
                  iconClassName="fa-solid fa-thumbs-up"
                  title={"Add To Favorite"}
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
                {"| "}
                {runTimeHours}h {runTimeMinutes}m
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
          <SeasonsList
            seriesId={mediaId}
            moviesData={seasons}
            onClick={handleSeasonPosterClick}
          />
        )}
        {seasonEpisodes?.length > 0 && (
          <SeasonEpisodes
            seasonEpisodes={seasonEpisodes}
            currSeasonName={currSeasonName}
            currSeasonNumber={currSeasonNumber}
            mediaId={mediaId}
          />
        )}

        {isLoading ? (
          <CastProfileCardSkeleton />
        ) : (
          credits?.cast.length > 0 && <MovieCasts castsInfo={credits.cast} />
        )}
      </div>
      {isAddRatingModalOpen && (
        <CustomModal
          shouldCloseOnOutSideClick={true}
          handleCloseMyCustomModal={handleCloseMyCustomModal}
        >
          <form action="" className="submitReviewForm" onSubmit={submitReview}>
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
