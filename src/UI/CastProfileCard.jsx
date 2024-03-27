import "./CastProfileCard.scss";
import profileFallBackImage from "../assets/profile_image.png";
import { handleFallBackImage } from "../utils/utilityFunctions";

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
            : profileFallBackImage
        }
        alt={name}
        onError={(event) => {
          handleFallBackImage(event, profileFallBackImage);
        }}
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
