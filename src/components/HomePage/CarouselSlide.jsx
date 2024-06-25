import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import repeat from "../../assets/Repeat.png";
import { getImagePath } from "../../utils/utilityFunctions";
import Button from "../common/Button";

const CarouselSlide = ({ count, displayMovie, mediaType }) => {
	const { adult, title, name, backdrop_path, overview, id } =
		displayMovie || {};

	return (
		<div
			className="carouselSlide"
			// for automatic carousel slider rotation
			style={{
				transform: `translateX(-${count * 100}%)`,
				background: `linear-gradient(to right, black 0%, transparent 100%), url(${getImagePath(
					backdrop_path
				)})`,
			}}
		>
			<h1 className="movieTitle">{title || name}</h1>

			<p className="movieDescription" title={overview}>
				{overview}
			</p>

			<div className="functionButtonsWrapper">
				<Link to={`/${mediaType}/moreInfo?id=${id}`}>
					<Button
						className="btn playBtn"
						iconClassName="fa-solid fa-play"
						text="Play"
					/>
				</Link>
				<Link to={`/${mediaType}/moreInfo?id=${id}`}>
					<Button
						className="btn moreInfoBtn"
						iconClassName="fa-solid fa-circle-info"
						text="More Info"
					/>
				</Link>
			</div>

			<div className="filmCertification">
				<div className="imgWrapper">
					<img src={repeat} alt="filmCertification Image" />
				</div>
				<div className="certification">{adult ? "अ/व U/A" : "अ | U"}</div>
			</div>
		</div>
	);
};

CarouselSlide.propTypes = {
	count: PropTypes.number.isRequired,
	displayMovie: PropTypes.shape({
		title: PropTypes.string,
		name: PropTypes.string,
		backdrop_path: PropTypes.string,
		overview: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
	mediaType: PropTypes.string.isRequired,
};

export default CarouselSlide;
