import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeasonEpisodes.scss";
import PropTypes from "prop-types";
import { fetchEpisodes } from "../../services/services.js";
import {
  getImagePath,
  handleFallBackImage,
} from "../../utils/utilityFunctions.js";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import Loader from "../common/Loader.jsx";
// import Loader from "../Loader.jsx";

const SeasonEpisodes = ({ mediaId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState({
    list: [],
    seasonName: "",
    isLoading: true,
  });
  const episodeWrapperRef = useRef(null);
  const { list, seasonName, isLoading } = episodes;
  const navigate = useNavigate();

  const handleEpisodeClick = ({ episode_number }) => {
    navigate(
      `/tv/moreInfo?id=${mediaId}&season=${seasonNumber}&episode=${episode_number}`
    );
    window.scrollTo(0, 0);
  };

  const getEpisodes = useCallback(async () => {
    try {
      const res = await fetchEpisodes({
        mediaId,
        mediaType: "tv",
        seasonNumber,
      });
      if (res) {
        const { episodes, name } = res;
        setEpisodes({
          list: episodes,
          seasonName: name,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [mediaId, seasonNumber]);

  useEffect(() => {
    getEpisodes();
    episodeWrapperRef.current?.scrollIntoView();
  }, [getEpisodes]);

  return (
    <div
      className="seasonEpisodes"
      style={{ scrollMargin: "150px" }}
      ref={episodeWrapperRef}
    >
      <h1 className="seasonName">{seasonName}</h1>
      {isLoading ? (
        <div className="loaderWrapper">
          <Loader className="loader" />
        </div>
      ) : (
        list.map(({ id, episode_number, still_path, overview, name }) => (
          <div
            key={id}
            className="episodeWrapper"
            onClick={() => handleEpisodeClick({ episode_number })}
          >
            <div className="episodePoster">
              <img
                src={
                  still_path ? getImagePath(still_path) : posterFallBackImage
                }
                alt="episode poster"
                onError={(event) =>
                  handleFallBackImage(event, posterFallBackImage)
                }
              />
            </div>
            <div className="episodeDetails">
              <h2 className="episodeTitle">{name}</h2>
              <p className="episodeOverview">{overview}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

SeasonEpisodes.propTypes = {
  mediaId: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
};

export default SeasonEpisodes;
