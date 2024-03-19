import { useEffect, useState } from "react";
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
  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await fetchMoreInfoOdMovie({ movieId: movieId });
      console.log(res);
      setMoreInfoOfMovie(res);
    };
    fetchMovieData();
  }, [movieId]);
  return (
    <div className="moreInfoPage">
      <div className="moviePoster">
        <h1>Movie Name</h1>
      </div>
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
          <span className="releaseYear">2003</span>
          <span className="movieLength">2h 55m</span>
          <span className="movieVideoQuality">HD</span>
        </p>
        <div className="movieRating">
          <Rating rating={8} ratingCount={655} />
        </div>
        <div className="movieDescription">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed tempore
          cum explicabo inventore. Cum, iste maiores. Adipisci at quam minus est
          is quas quidem consequuntur rem.
        </div>
      </div>
      <MovieCasts
        castsInfo={moreInfoOfMovie.credits ? moreInfoOfMovie.credits.cast : []}
      />
    </div>
  );
};

export default MoreInfoAboutMoviePage;
