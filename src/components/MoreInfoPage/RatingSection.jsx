import PropTypes from "prop-types";
import Rating from "../common/Rating";
import Button from "../common/Button";
import { useContext, useState } from "react";
import CustomModal from "../common/CustomModal";
import { submitMediaRating } from "../../services/services";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import RatingStars from "../common/RatingStars";

const RatingSection = ({
	vote_average,
	vote_count,
	title,
	name,
	mediaType,
	episodeNumber,
	seasonNumber,
	mediaId,
}) => {
	const { loggedInUser } = useContext(AuthContext);
	const { sessionID } = loggedInUser;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rating, setRating] = useState(8);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleRatingChange = ({ target: { value } }) => {
		setRating(value);
	};

	const submitReview = async (event) => {
		event.preventDefault();
		try {
			const res = await submitMediaRating({
				mediaType,
				rating,
				mediaId,
				sessionID,
				seasonNumber,
				episodeNumber,
			});
			if (res.success) {
				toast.success("Rating submitted successfully");
				closeModal();
			} else {
				toast.error(res.status_message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="movieRating">
				<Rating
					rating={vote_average ? vote_average.toFixed(2) : "0.0"}
					ratingCount={vote_count}
				/>
				<Button className="rateNowBtn" text={"Rate Now"} onClick={openModal} />
			</div>
			{isModalOpen && (
				<CustomModal handleClose={closeModal}>
					<form className="submitReviewForm" onSubmit={submitReview}>
						<div className="inputWrapper">
							<label htmlFor="mediaName">Media Name</label>
							<input
								className="readOnly"
								type="text"
								id="mediaName"
								value={title || name}
								readOnly
							/>
						</div>
						<div className="inputWrapper">
							<label htmlFor="mediaRating">Your Rating out of 10</label>
							<div className="ratingsWrapper">
								<RatingStars value={rating} onChange={handleRatingChange} />
							</div>
						</div>
						<div className="submitReviewWrapper">
							<Button text="Submit Review" type="submit" />
						</div>
					</form>
				</CustomModal>
			)}
		</>
	);
};

RatingSection.propTypes = {
	vote_average: PropTypes.string,
	vote_count: PropTypes.string,
	title: PropTypes.string,
	name: PropTypes.string,
	mediaType: PropTypes.string,
	episodeNumber: PropTypes.string,
	seasonNumber: PropTypes.string,
	mediaId: PropTypes.string,
};

export default RatingSection;
