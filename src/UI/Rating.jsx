import "./Rating.scss";

const Rating = ({ rating, ratingCount }) => {
  return (
    <div className="ratingWrapper">
      <h3>Rating</h3>
      <progress id="file" value={rating} max="10">
        {rating}
      </progress>
      {rating}/10 ({ratingCount})
    </div>
  );
};

export default Rating;
