import { useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import RoundButton from "../UI/RoundButton";
import "./MoreInfoAboutMoviePage.scss";
import Rating from "../UI/Rating";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import CustomModal from "../UI/CustomModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addToFavorite,
  addToWatchList,
  fetchEpisodes,
  fetchMoreInfoOfMedia,
  submitMediaRating,
} from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import SeasonsList from "../components/MoreInfoPage/SeasonsList";
import SeasonEpisodes from "../components/MoreInfoPage/SeasonEpisodes";
import PropTypes from "prop-types";

const MoreInfoAboutMoviePage = ({ mediaType }) => {
  const [isVolumeMuted, setIsVolumeMuted] = useState(true);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [currSeasonName, setCurrSeasonName] = useState("");
  const [currSeasonNumber, setCurrSeasonNumber] = useState(-1);
  const [moreInfoOfMovie, setMoreInfoOfMovie] = useState({});
  const [isAddRatingModalOpen, setIsAddRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState("");
  const navigate = useNavigate();

  const [loggedInUser] = useLocalStorage("loggedInUser", null);

  const handleMuteVolumeClick = () => {
    setIsVolumeMuted((prevState) => !prevState);
  };
  const [searchParamas] = useSearchParams();
  const mediaId = searchParamas.get("id");
  const seasonNumber = searchParamas.get("season");
  const episodeNumber = searchParamas.get("episode");

  const handleSeasonPosterClick = useCallback(async () => {
    const res = await fetchEpisodes({
      mediaId: mediaId,
      mediaType: mediaType,
      seasonNumber: seasonNumber,
    });
    setSeasonEpisodes(res.episodes);
    setCurrSeasonName(res.name);
    setCurrSeasonNumber(res.season_number);
  }, [mediaId, mediaType, seasonNumber]);

  const handleCloseMyCustomModal = () => {
    setIsAddRatingModalOpen(false);
  };

  const handleAddRating = () => {
    setIsAddRatingModalOpen(true);
  };

  const fetchMovieData = useCallback(async () => {
    const res = await fetchMoreInfoOfMedia({
      mediaId: mediaId,
      mediaType: mediaType,
      isEpisode: episodeNumber,
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
    });
    setMoreInfoOfMovie(res);
  }, [episodeNumber, mediaId, mediaType, seasonNumber]);
  useEffect(() => {
    fetchMovieData();
    if (seasonNumber) {
      handleSeasonPosterClick();
    }
  }, [fetchMovieData, handleSeasonPosterClick, seasonNumber]);

  const runtime = moreInfoOfMovie.runtime;
  const runTimeHours = parseInt(runtime / 60);
  const runTimeMinutes = runtime - runTimeHours * 60;

  const handleAddToFavorite = async () => {
    const res = await addToFavorite({
      sessionID: loggedInUser.sessionID,
      media_id: moreInfoOfMovie.id,
      media_type: mediaType,
    });
    if (res) {
      console.log("added to favorite");
    } else {
      console.log("oops!, something went wrong");
    }
  };
  const handleAddToWatchList = async () => {
    const res = await addToWatchList({
      sessionID: loggedInUser.sessionID,
      media_id: moreInfoOfMovie.id,
      media_type: mediaType,
    });
    if (res) {
      console.log("added to WatchList");
    } else {
      console.log("oops!, something went wrong");
    }
  };

  const handleRatingChange = ({ target: { value } }) => {
    const onlyDigitsRegEx = /^\d*\.?\d*$/;
    if (!onlyDigitsRegEx.test(value)) {
      return false;
    }
    setUserRating(value);
  };

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const submitReview = async (event) => {
    event.preventDefault();
    const ratingRegEx = /^(10(\.0)?|\d(\.\d)?)$/;
    if (ratingRegEx.test(userRating)) {
      try {
        const res = await submitMediaRating({
          mediaType: mediaType,
          rating: userRating,
          mediaId: mediaId,
          sessionID: loggedInUser.sessionID,
          isEpisode: episodeNumber,
          seasonNumber: seasonNumber,
          episodeNumber: episodeNumber,
        });
        if (res) {
          console.log("rating submitted successfully");
          setIsAddRatingModalOpen(false);
        } else {
          console.log("something went wrong while submitting rating");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("rating should between 0.0 to 10.0");
    }
  };

  return (
    <div className="moreInfoPage">
      <div
        className="moviePoster"
        style={{
          background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${
            moreInfoOfMovie.backdrop_path ??
            moreInfoOfMovie.poster_path ??
            moreInfoOfMovie.still_path
          }")`,
        }}
      >
        <h1 className="movieTitle">
          {moreInfoOfMovie.title ?? moreInfoOfMovie.name}
        </h1>
        <button className="backBtn" onClick={handleBackBtnClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div className="movieDetailsWrapper">
        <div className="functionBtns">
          <div className="leftBtns">
            <Button
              className={"btn playBtn"}
              iconClassName={"fa-solid fa-play"}
              text={"Play"}
              style={{ marginRight: "10px" }}
            />
            <RoundButton
              onClick={handleAddToWatchList}
              iconClassName="fa-solid fa-circle-plus"
              title={"Add To WatchList"}
            />
            <RoundButton
              onClick={handleAddToFavorite}
              iconClassName="fa-solid fa-thumbs-up"
              title={"Add To Favorite"}
            />
          </div>
          <div className="rightBtns">
            <RoundButton
              onClick={handleMuteVolumeClick}
              iconClassName={`fa-solid ${
                isVolumeMuted ? "fa-volume-xmark" : "fa-volume-high"
              } `}
            />
          </div>
        </div>
        <div className="aboutMovie">
          {mediaType === "movie" && (
            <p className="movieDetails">
              <span className="releaseYear">
                {moreInfoOfMovie.release_date
                  ? moreInfoOfMovie.release_date.slice(0, 4)
                  : ""}
              </span>
              <span className="movieLength">
                {"| "}
                {runTimeHours}h {runTimeMinutes}m
              </span>
              <span className="movieVideoQuality">HD</span>
            </p>
          )}
          {moreInfoOfMovie.genres && (
            <p className="movieGenres">
              {moreInfoOfMovie.genres.map((genre, idx) => (
                <span key={genre.id}>
                  {genre.name}{" "}
                  {idx === moreInfoOfMovie.genres.length - 1 ? "" : "| "}
                </span>
              ))}
            </p>
          )}

          <div className="movieDescription">{moreInfoOfMovie.overview}</div>

          <div className="movieRating">
            <Rating
              rating={
                moreInfoOfMovie.vote_average
                  ? moreInfoOfMovie.vote_average.toFixed(2)
                  : "0.0"
              }
              ratingCount={moreInfoOfMovie.vote_count}
            />
            <Button
              text={"Rate Now"}
              style={{
                margin: "15px 0 0",
                padding: "10px 15px",
                fontSize: "20px",
                background: "grey",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={handleAddRating}
            />
          </div>
        </div>
        {mediaType === "tv" && moreInfoOfMovie.seasons && (
          <SeasonsList
            moviesData={moreInfoOfMovie.seasons}
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

        {moreInfoOfMovie.credits && (
          <MovieCasts castsInfo={moreInfoOfMovie.credits.cast} />
        )}
      </div>
      {isAddRatingModalOpen && (
        <CustomModal
          shouldCloseOnOutSideClick={false}
          handleCloseMyCustomModal={handleCloseMyCustomModal}
        >
          <form action="" onSubmit={submitReview}>
            <div className="inputWrapper" style={{ marginBottom: "15px" }}>
              <label htmlFor="mediaName">Media Name</label>
              <input
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid #000",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  fontSize: "16px",
                  cursor: "no-drop",
                }}
                type="text"
                id="mediaName"
                value={moreInfoOfMovie.title ?? moreInfoOfMovie.name}
                readOnly
              />
            </div>
            <div className="inputWrapper" style={{ marginBottom: "15px" }}>
              <label htmlFor="mediaRating">Your Rating out of 10</label>
              <input
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid #000",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  fontSize: "16px",
                }}
                type="text"
                id="mediaRating"
                value={userRating}
                onChange={handleRatingChange}
                required
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="mediaReview">Your Review</label>
              <textarea
                style={{
                  width: "100%",
                  border: "1px solid #000",
                  borderRadius: "5px",
                  padding: "5px",
                  fontSize: "16px",
                }}
                id="mediaReview"
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <div
              className="submitRevieBtnWrapper"
              style={{ width: "100%", textAlign: "center" }}
            >
              <Button
                text="Submit Review"
                style={{
                  margin: "15px 0 0",
                  padding: "10px 15px",
                  fontSize: "20px",
                  background: "grey",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
                type="submit"
              />
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
