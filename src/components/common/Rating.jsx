import CircularProgress from "./CircularProgress";
import "./Rating.scss";
import PropTypes from "prop-types";

const Rating = ({ rating, ratingCount }) => {
  return (
    <div className="ratingWrapper">
      <h3>Rating </h3>
      <span className="ratingCount">
        (<i className="fa-solid fa-users"></i> {ratingCount})
      </span>
      <CircularProgress rating={rating} />
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.string,
  ratingCount: PropTypes.number,
};

export default Rating;
