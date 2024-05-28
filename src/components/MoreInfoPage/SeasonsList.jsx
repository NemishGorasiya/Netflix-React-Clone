import CategoryWiseList from "../HomePage/CategoryWiseList";
import PropTypes from "prop-types";

const SeasonsList = ({ seriesId }) => {
	const categoryTitle = "ALL SEASONS";
	const mediaType = "tv";
	const isSeasonList = true;

	return (
		<div className="seasonsList">
			<CategoryWiseList
				categoryTitle={categoryTitle}
				mediaType={mediaType}
				isSeasonList={isSeasonList}
				seriesId={seriesId}
			/>
		</div>
	);
};

SeasonsList.propTypes = {
	seriesId: PropTypes.string,
};

export default SeasonsList;
