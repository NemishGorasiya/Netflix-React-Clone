import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import repeat from "../../assets/Repeat.png";
import PropTypes from "prop-types";

const DisplayMovie = ({ count, displayMovie, mediaType }) => {
  return (
    <div
      className="currentlyPlayingContent"
      style={{
        transform: `translateX(-${count * 100}%)`,
        background: `linear-gradient(to right,black 0% ,transparent 100%) , url("https://image.tmdb.org/t/p/original/${displayMovie.backdrop_path}")`,
      }}
    >
      <h1 className="movieTitle">{displayMovie.title ?? displayMovie.name}</h1>

      <p className="movieDesctiption" title={displayMovie.overview}>
        {displayMovie.overview}
      </p>
      {/* <div className="trendingContainer">
        <span className="top10">
          Top
          <br />
          10
        </span>
        <span className="trendingRank">
          #1 in Movies <br /> Today
        </span>
      </div> */}
      <div className="playBtnsWrapper">
        <Button
          className={"btn playBtn"}
          iconClassName={"fa-solid fa-play"}
          text={"Play"}
          style={{ marginRight: "10px" }}
        />
        <Link to={`/${mediaType}/moreInfo?id=${displayMovie.id}`}>
          <Button
            className={"btn moreInfoBtn"}
            iconClassName={"fa-solid fa-circle-info"}
            text={"More Info"}
          />
        </Link>
      </div>
      <div className="filmCertification">
        <div className="imgWrapper">
          <img src={repeat} alt="roundImage" />
        </div>
        <div className="certification">U/A 13+</div>
      </div>
    </div>
  );
};

DisplayMovie.propTypes = {
  count: PropTypes.number,
  displayMovie: PropTypes.object,
  mediaType: PropTypes.string,
};

export default DisplayMovie;
