import SeasonsList from "./SeasonsList";
import SeasonEpisodes from "./SeasonEpisodes";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const TvSeasonsWrapper = ({ mediaId }) => {
	const [searchParams] = useSearchParams();
	const seasonNumber = searchParams.get("season");

	return (
		<>
			<SeasonsList seriesId={mediaId} />
			{seasonNumber && (
				<SeasonEpisodes seasonNumber={seasonNumber} mediaId={mediaId} />
			)}
		</>
	);
};

TvSeasonsWrapper.propTypes = {
	mediaId: PropTypes.string.isRequired,
};

export default TvSeasonsWrapper;
