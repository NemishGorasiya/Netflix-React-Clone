import React from "react";
import Skeleton from "react-loading-skeleton";

const CastProfileCardSkeleton = () => {
  return (
    <div className="movieCasts">
      <div className="movieCastHeading">
        <Skeleton height={50} width={250} />
      </div>
      <div className="castProfileCardWrapper">
        {Array(15)
          .fill()
          .map((ele, idx) => (
            <div key={idx} className="castProfileCard">
              <Skeleton className="castImage" />
              <p className="castName">
                <Skeleton />
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CastProfileCardSkeleton;
