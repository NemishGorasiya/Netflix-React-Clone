import "./SeasonEpisodes.scss";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import { handleFallBackImage } from "../../utils/utilityFunctions.js";
import PropTypes from "prop-types";

const SeasonEpisodes = ({ seasonEpisodes, currSeasonName }) => {
  return (
    <div className="seasonEpisodes">
      <h1 className="seasonName">{currSeasonName}</h1>
      {seasonEpisodes.map((episode) => (
        <div className="episodeWrapper" key={episode.id}>
          <div className="episodePoster">
            <img
              src={
                episode.still_path
                  ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                  : posterFallBackImage
              }
              alt="not found"
              onError={(event) => {
                handleFallBackImage(event, posterFallBackImage);
              }}
            />
          </div>
          <div className="episodeDetails">
            <h2 className="episodeTitle">{episode.name}</h2>
            <p className="episodeOverview">{episode.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

SeasonEpisodes.propTypes = {
  seasonEpisodes: PropTypes.array,
  currSeasonName: PropTypes.string,
};

export default SeasonEpisodes;
