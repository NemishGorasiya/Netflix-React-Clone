import { useEffect, useRef, useState } from "react";
import "./MovieCasts.scss";
import CastProfileCard from "./CastProfileCard.jsx";
import PropTypes from "prop-types";

const MovieCasts = ({ castsInfo }) => {
	const [isViewAllCasts, setIsViewAllCasts] = useState(false);
	const [isViewAllBtnVisible, setIsViewAllBtnVisible] = useState(false);
	const castProfileCardWrapperRef = useRef();

	const handleViewAllCastsClick = () => {
		setIsViewAllCasts((prevState) => !prevState);
	};

	useEffect(() => {
		setIsViewAllBtnVisible(
			castProfileCardWrapperRef.current &&
				castProfileCardWrapperRef.current.scrollWidth >
					castProfileCardWrapperRef.current.offsetWidth
		);
	}, [castsInfo]);

	return (
		<div className="movieCasts">
			<div className="movieCastHeading">
				<h2>TOP CASTS</h2>
				{isViewAllCasts && (
					<span className="viewLessSpan" onClick={handleViewAllCastsClick}>
						View less
					</span>
				)}
			</div>
			<div
				ref={castProfileCardWrapperRef}
				className={`castProfileCardWrapper ${
					isViewAllCasts ? "viewAllCasts" : ""
				}`}
			>
				{!isViewAllCasts && isViewAllBtnVisible && (
					<div className="viewAllCastsBtn" onClick={handleViewAllCastsClick} />
				)}
				{castsInfo.map((cast) => (
					<CastProfileCard key={cast.id} castsInfo={cast} />
				))}
			</div>
		</div>
	);
};

MovieCasts.propTypes = {
	castsInfo: PropTypes.arrayOf(PropTypes.object),
};

export default MovieCasts;
