import { useEffect, useState } from "react";
import "./CircularProgress.scss";

const CircularProgress = ({ rating }) => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const setDegreeInterval = setInterval(() => {
      if (degree >= rating * 36) {
        // console.log("running");
        clearInterval(setDegreeInterval);
        return;
      }
      setDegree((prev) => prev + 18);
    }, 50);

    return () => clearInterval(setDegreeInterval); // Cleanup function
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

export default CircularProgress;
