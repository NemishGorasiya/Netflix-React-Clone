import { useEffect, useState } from "react";
import "./CircularProgress.scss";
import PropTypes from "prop-types";

const CircularProgress = ({ rating }) => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const setDegreeInterval = setInterval(() => {
      if (degree >= rating * 36) {
        clearInterval(setDegreeInterval);
        return;
      }
      setDegree((prev) => prev + 18);
    }, 50);

    return () => clearInterval(setDegreeInterval);
  }, [degree, rating]);

  return (
    <div
      className="circularProgressOuter"
      style={{
        background: `conic-gradient(#fff ${degree}deg, grey 0deg)`,
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
