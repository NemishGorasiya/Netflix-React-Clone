import { useEffect } from "react";
import "./CastProfileCard.scss";

const CastProfileCard = (castInfo) => {
  const { name, character, profile_path, known_for_department } =
    castInfo.castsInfo;
  return (
    <div className="castProfileCard">
      <img
        className="castImage"
        src={`https://image.tmdb.org/t/p/original/${profile_path}`}
        alt=""
      />
      <p className="castName" title={name}>
        {name}
      </p>
      <p className="castCharacterName" title={character}>
        {character}
      </p>
      <p className="department" title={known_for_department}>
        ({known_for_department})
      </p>
    </div>
  );
};

export default CastProfileCard;
