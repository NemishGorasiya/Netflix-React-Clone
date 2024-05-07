import CategoryWiseList from "./CategoryWiseList.jsx";
import "./MoviesCategories.scss";
import { movieTypes, tvShowsTypes } from "../../constants/constants.js";
import PropTypes from "prop-types";
import RenderIfVisible from "react-render-if-visible";
import { changeFormatOfTitle } from "../../utils/utilityFunctions.js";

const MoviesCategories = ({ mediaType }) => {
	const categories = mediaType === "movie" ? movieTypes : tvShowsTypes;

	return (
		<div className="moviesCategoriesWrapper">
			<h1 className="moviesCategoriesTitle">
				{changeFormatOfTitle(mediaType)}
			</h1>
			{categories.map((category) => (
				<RenderIfVisible key={category} stayRendered={true}>
					<CategoryWiseList categoryTitle={category} mediaType={mediaType} />
				</RenderIfVisible>
			))}
		</div>
	);
};

MoviesCategories.propTypes = {
	mediaType: PropTypes.string,
};

export default MoviesCategories;
