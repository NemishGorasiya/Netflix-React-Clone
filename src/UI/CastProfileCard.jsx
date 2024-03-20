import { useEffect } from "react";
import "./CastProfileCard.scss";
import profile_image from "../assets/profile_image.png";

const CastProfileCard = (castInfo) => {
  const { name, character, profile_path, known_for_department } =
    castInfo.castsInfo;
  return (
    <div className="castProfileCard">
      <img
        className="castImage"
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/original/${profile_path}`
            : profile_image
        }
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
