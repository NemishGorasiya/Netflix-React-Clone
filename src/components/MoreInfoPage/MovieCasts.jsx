import { useEffect, useRef, useState } from "react";
import "./MovieCasts.scss";
import CastProfileCard from "../../UI/CastProfileCard";
import PropTypes from "prop-types";

const MovieCasts = ({ castsInfo }) => {
  const [isViewAllCasts, setIsViewAllCasts] = useState(false);
  const [needOfViewAllBtn, setNeedOfViewAllBtn] = useState(true);
  const castProfileCardWrapperRef = useRef();

  const handleViewAllCastsClick = () => {
    setIsViewAllCasts((prevState) => !prevState);
  };

  useEffect(() => {
    if (
      castProfileCardWrapperRef.current.scrollWidth <=
      castProfileCardWrapperRef.current.offsetWidth
    ) {
      setNeedOfViewAllBtn(false);
    } else {
      setNeedOfViewAllBtn(true);
    }
  }, []);
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
        ref={castProfileCardWrapperRef}
        className={`castProfileCardWrapper ${
          isViewAllCasts ? "viewAllCasts" : ""
        }`}
      >
        {!isViewAllCasts && needOfViewAllBtn && (
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

MovieCasts.propTypes = {
  castsInfo: PropTypes.array,
};

export default MovieCasts;
