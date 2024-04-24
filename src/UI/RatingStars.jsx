import "./RatingStars.scss";

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

export default RatingStars;
