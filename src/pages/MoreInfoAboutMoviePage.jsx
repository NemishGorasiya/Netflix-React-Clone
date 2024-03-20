import { useCallback, useEffect, useState } from "react";
import Button from "../UI/Button";
import RoundButton from "../UI/RoundButton";
import "./MoreInfoAboutMoviePage.scss";
import Rating from "../UI/Rating";
import CastProfileCard from "../UI/CastProfileCard";
import MovieCasts from "../components/MoreInfoPage/MovieCasts";
import { useSearchParams } from "react-router-dom";
import { fetchMoreInfoOdMovie } from "../utils/http";

const MoreInfoAboutMoviePage = () => {
  const [isVolumeMuted, setIsVolumeMuted] = useState(true);
  const [moreInfoOfMovie, setMoreInfoOfMovie] = useState({});
  const handleMuteVolumeClick = () => {
    setIsVolumeMuted((prevState) => !prevState);
  };
  const [searchParamas] = useSearchParams();
  const movieId = searchParamas.get("id");
  const fetchMovieData = useCallback(async () => {
    const res = await fetchMoreInfoOdMovie({ movieId: movieId });
    setMoreInfoOfMovie(res);
  }, [movieId]);
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const runtime = moreInfoOfMovie.runtime;
  const runTimeHours = parseInt(runtime / 60);
  const runTimeMinutes = runtime - runTimeHours * 60;

  return (
    <div className="moreInfoPage">
      <div
        className="moviePoster"
        style={{
          background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${moreInfoOfMovie.backdrop_path}")`,
        }}
      >
        <h1 className="movieTitle">{moreInfoOfMovie.title}</h1>
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
            <RoundButton iconClassName="fa-solid fa-circle-plus" />
            <RoundButton iconClassName="fa-solid fa-thumbs-up" />
          </div>
          <div className="rightBtns">
            <RoundButton
              handleMuteVolumeClick={handleMuteVolumeClick}
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
        {moreInfoOfMovie.credits && (
          <MovieCasts castsInfo={moreInfoOfMovie.credits.cast} />
        )}
      </div>
    </div>
  );
};

export default MoreInfoAboutMoviePage;
