import CircularProgress from "./CircularProgress";
import "./Rating.scss";

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

export default Rating;
