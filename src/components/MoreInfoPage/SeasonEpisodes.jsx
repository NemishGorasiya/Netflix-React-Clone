import "./SeasonEpisodes.scss";
import posterFallBackImage from "../../assets/posterNotFound.jpg";
import {
	getImagePath,
	handleFallBackImage,
} from "../../utils/utilityFunctions.js";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll.jsx";
import { fetchEpisodes } from "../../services/services.js";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader.jsx";

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
	const navigate = useNavigate();

	const handleEpisodeClick = ({
		mediaId,
		currSeasonNumber,
		episode_number,
	}) => {
		navigate(
			`/tv/moreInfo?id=${mediaId}&season=${currSeasonNumber}&episode=${episode_number}`
		);
		window.scrollTo(0, 0);
	};

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
					list: res.episodes,
					isLoading: false,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, [currSeasonNumber, mediaId]);

	useEffect(() => {
		getEpisodes();
	}, [getEpisodes]);

	return (
		<div className="seasonEpisodes">
			<h1 className="seasonName">{currSeasonName}</h1>
			{isEpisodesLoading ? (
				<div className="loaderWrapper">
					<Loader className="loader" />
				</div>
			) : (
				seasonEpisodes.map(
					({ id, episode_number, still_path, overview, name }) => (
						<div
							key={id}
							className="episodeWrapper"
							onClick={() => {
								handleEpisodeClick({
									mediaId,
									currSeasonNumber,
									episode_number,
								});
							}}
						>
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
					)
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
