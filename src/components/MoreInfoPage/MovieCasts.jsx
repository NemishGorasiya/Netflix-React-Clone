import { useState } from "react";
import "./MovieCasts.scss";
import CastProfileCard from "../../UI/CastProfileCard";

const MovieCasts = ({ castsInfo }) => {
  const [isViewAllCasts, setIsViewAllCasts] = useState(false);
  const handleViewAllCastsClick = () => {
    setIsViewAllCasts((prevState) => !prevState);
  };
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
        className={`castProfileCardWrapper ${
          isViewAllCasts ? "viewAllCasts" : ""
        }`}
      >
        {!isViewAllCasts && (
          <div
            className="viewAllCastsBtn"
            onClick={handleViewAllCastsClick}
          ></div>
        )}
        {castsInfo.map((cast) => {
          return <CastProfileCard key={cast.id} castsInfo={cast} />;
        })}
      </div>
    </div>
  );
};

export default MovieCasts;
