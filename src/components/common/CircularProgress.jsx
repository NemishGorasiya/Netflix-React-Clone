import PropTypes from "prop-types";
import "./CircularProgress.scss";

const CircularProgress = ({ rating }) => {
  const degree = rating * 36;

  return (
    <div
      className="circularProgressOuter"
      style={{
        "--degree": `${degree}deg`,
      }}
    >
      <div className="circularProgressInner">
        <span className="ratingSpan">{rating}/10</span>
      </div>
    </div>
  );
};

CircularProgress.propTypes = {
  rating: PropTypes.string,
};

export default CircularProgress;
