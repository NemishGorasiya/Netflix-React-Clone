import "./RatingStars.scss";
import PropTypes from "prop-types";

const RatingStars = ({ onChange, value }) => {
  return (
    <input
      className="rating"
      type="range"
      max="10"
      step="0.5"
      onChange={onChange}
      value={value}
      style={{ "--value": value }}
      data-value={parseFloat(value).toFixed(1)}
    />
  );
};

RatingStars.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default RatingStars;
