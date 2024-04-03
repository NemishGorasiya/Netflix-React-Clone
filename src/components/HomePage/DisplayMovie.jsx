import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import repeat from "../../assets/Repeat.png";
import PropTypes from "prop-types";
import { getImagePath } from "../../utils/utilityFunctions";

const DisplayMovie = ({ count, displayMovie, mediaType }) => {
  const { title, name, backdrop_path, overview, id } = displayMovie;
  return (
    <div
      className="currentlyPlayingContent"
      style={{
        transform: `translateX(-${count * 100}%)`,
        background: `linear-gradient(to right,black 0% ,transparent 100%) , url(${getImagePath(
          backdrop_path
        )})`,
      }}
    >
      <h1 className="movieTitle">{title ?? name}</h1>

      <p className="movieDescription" title={overview}>
        {overview}
      </p>
      <div className="playBtnsWrapper">
        <Button
          className={"btn playBtn"}
          iconClassName={"fa-solid fa-play"}
          text={"Play"}
          style={{ marginRight: "10px" }}
        />
        <Link to={`/${mediaType}/moreInfo?id=${id}`}>
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
