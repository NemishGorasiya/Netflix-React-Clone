import PropTypes from "prop-types";
import {
	handleFallBackImage,
	getImagePath,
} from "../../utils/utilityFunctions.js";
import profileFallBackImage from "../../assets/profile_image.png";
import "./CastProfileCard.scss";

const CastProfileCard = ({ castsInfo }) => {
	const { name, character, profile_path, known_for_department } =
		castsInfo || {};

	return (
		<div className="castProfileCard">
			<img
				className="castImage"
				src={profile_path ? getImagePath(profile_path) : profileFallBackImage}
				alt={name}
				onError={(event) => handleFallBackImage(event, profileFallBackImage)}
			/>
			<p className="castName" title={name}>
				{name}
			</p>
			<p className="castCharacterName" title={character}>
				{character}
			</p>
			<p className="department" title={known_for_department}>
				({known_for_department})
			</p>
		</div>
	);
};

CastProfileCard.propTypes = {
	castsInfo: PropTypes.shape({
		name: PropTypes.string,
		character: PropTypes.string,
		profile_path: PropTypes.string,
		known_for_department: PropTypes.string,
	}),
};

export default CastProfileCard;
