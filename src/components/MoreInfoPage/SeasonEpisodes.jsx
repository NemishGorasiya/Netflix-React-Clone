import "./SeasonEpisodes.scss";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import {
  getImagePath,
  handleFallBackImage,
} from "../../utils/utilityFunctions.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll.jsx";
import { fetchEpisodes } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";

const SeasonEpisodes = ({
  seasonEpisodes,
  currSeasonName,
  currSeasonNumber,
  mediaId,
}) => {
  const [episodes, setEpisodes] = useState({
    list: [],
    isLoading: true,
  });
  const { list: episodesList, isLoading: isEpisodesLoading } = episodes;

  const getEpisodes = useCallback(async () => {
    try {
      setEpisodes((prevEpisodes) => ({ ...prevEpisodes, isLoading: true }));
      const res = await fetchEpisodes({
        mediaId,
        mediaType: "tv",
        seasonNumber: currSeasonNumber,
      });
      if (res) {
        setEpisodes((prevEpisodes) => ({
          list: [...prevEpisodes, ...res],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, [currSeasonNumber, mediaId]);
  const fetchMoreEpisodes = () => {};
  useEffect(() => {
    getEpisodes();
  }, [getEpisodes]);
  return (
    <div className="seasonEpisodes">
      <h1 className="seasonName">{currSeasonName}</h1>
      <InfiniteScroll
        items={episodesList}
        renderItem={({ id, episode_number, still_path, overview, name }) => (
          <Link
            key={id}
            to={`/tv/moreInfo?id=${mediaId}&season=${currSeasonNumber}&episode=${episode_number}`}
          >
            <div className="episodeWrapper">
              <div className="episodePoster">
                <img
                  src={
                    still_path ? getImagePath(still_path) : posterFallBackImage
                  }
                  alt="not found"
                  onError={(event) => {
                    handleFallBackImage(event, posterFallBackImage);
                  }}
                />
              </div>
              <div className="episodeDetails">
                <h2 className="episodeTitle">{name}</h2>
                <p className="episodeOverview">{overview}</p>
              </div>
            </div>
          </Link>
        )}
        fetchMoreData={fetchMoreEpisodes}
        isLoading={isEpisodesLoading}
      />
      {seasonEpisodes.map(
        ({ id, episode_number, still_path, overview, name }) => (
          <Link
            key={id}
            to={`/tv/moreInfo?id=${mediaId}&season=${currSeasonNumber}&episode=${episode_number}`}
          >
            <div className="episodeWrapper">
              <div className="episodePoster">
                <img
                  src={
                    still_path ? getImagePath(still_path) : posterFallBackImage
                  }
                  alt="not found"
                  onError={(event) => {
                    handleFallBackImage(event, posterFallBackImage);
                  }}
                />
              </div>
              <div className="episodeDetails">
                <h2 className="episodeTitle">{name}</h2>
                <p className="episodeOverview">{overview}</p>
              </div>
            </div>
          </Link>
        )
      )}
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
