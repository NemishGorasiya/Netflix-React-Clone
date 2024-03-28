import "./SeasonEpisodes.scss";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import { handleFallBackImage } from "../../utils/utilityFunctions.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SeasonEpisodes = ({
  seasonEpisodes,
  currSeasonName,
  currSeasonNumber,
  mediaId,
}) => {
  return (
    <div className="seasonEpisodes">
      <h1 className="seasonName">{currSeasonName}</h1>
      {seasonEpisodes.map((episode) => (
        <Link
          key={episode.id}
          to={`/tv/moreInfo?id=${mediaId}&season=${currSeasonNumber}&episode=${episode.episode_number}`}
        >
          <div className="episodeWrapper">
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
        </Link>
      ))}
    </div>
  );
};

SeasonEpisodes.propTypes = {
  seasonEpisodes: PropTypes.array,
  currSeasonName: PropTypes.string,
  currSeasonNumber: PropTypes.number,
  mediaId: PropTypes.string,
};

export default SeasonEpisodes;
