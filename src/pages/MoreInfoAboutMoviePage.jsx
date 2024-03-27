import { useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import RoundButton from "../UI/RoundButton";
import "./MoreInfoAboutMoviePage.scss";
import Rating from "../UI/Rating";
import CastProfileCard from "../UI/CastProfileCard";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  addToFavorite,
  addToWatchList,
  fetchEpisodes,
  fetchMoreInfoOfMedia,
} from "../services/services";
import useLocalStorage from "../hooks/useLocalStorage";
import SeasonsList from "../components/MoreInfoPage/SeasonsList";
import SeasonEpisodes from "../components/MoreInfoPage/SeasonEpisodes";

const MoreInfoAboutMoviePage = ({ mediaType }) => {
  const [isVolumeMuted, setIsVolumeMuted] = useState(true);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [currSeasonName, setCurrSeasonName] = useState("");
  const [moreInfoOfMovie, setMoreInfoOfMovie] = useState({});
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", "");

  const handleMuteVolumeClick = () => {
    setIsVolumeMuted((prevState) => !prevState);
  };
  const [searchParamas] = useSearchParams();
  const mediaId = searchParamas.get("id");
  const seasonNumber = searchParamas.get("season");

  const handleSeasonPosterClick = async (seasonNumber) => {
    const res = await fetchEpisodes({
      mediaId: mediaId,
      mediaType: mediaType,
      seasonNumber: seasonNumber,
    });
    setSeasonEpisodes(res.episodes);
    setCurrSeasonName(res.name);
  };

  const fetchMovieData = useCallback(async () => {
    const res = await fetchMoreInfoOfMedia({
      mediaId: mediaId,
      mediaType: mediaType,
    });
    setMoreInfoOfMovie(res);
  }, [mediaId, mediaType]);
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

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

  return (
    <div className="moreInfoPage">
      <div
        className="moviePoster"
        style={{
          background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${moreInfoOfMovie.backdrop_path}")`,
        }}
      >
        <h1 className="movieTitle">
          {moreInfoOfMovie.title ?? moreInfoOfMovie.name}
        </h1>
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
            />
            <RoundButton
              onClick={handleAddToFavorite}
              iconClassName="fa-solid fa-thumbs-up"
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
                  : ""
              }
              ratingCount={moreInfoOfMovie.vote_count}
            />
          </div>
        </div>
        {mediaType === "tv" && moreInfoOfMovie.seasons && (
          <SeasonsList
            moviesData={moreInfoOfMovie.seasons}
            onClick={handleSeasonPosterClick}
          />
        )}
        {/* {seasonEpisodes && <SeasonEpisodes moviesData={seasonEpisodes} />} */}
        {seasonEpisodes.length > 0 && (
          <SeasonEpisodes
            seasonEpisodes={seasonEpisodes}
            currSeasonName={currSeasonName}
          />
        )}

        {moreInfoOfMovie.credits && (
          <MovieCasts castsInfo={moreInfoOfMovie.credits.cast} />
        )}
      </div>
    </div>
  );
};

export default MoreInfoAboutMoviePage;
