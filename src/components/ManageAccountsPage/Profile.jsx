import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import addAccountImage from "../../assets/plusImage.jpg";
import fallBackProfileImage from "../../assets/profile_image.png";
import "./Profile.scss";

const Profile = ({
  profileName,
  profileImage,
  isAddAccount = false,
  handleOpenMyCustomModal,
}) => {
  const { loggedInUser } = useContext(AuthContext);
  const { username } = loggedInUser;

  const profileLink = username === profileName ? "#" : "/auth?mode=login";

  // isAddAccount indicates that it is not profileCard but it is last card in row that is used to add new account
  return (
    <div
      className={`profileWrapper ${isAddAccount ? "addAccount" : ""}`}
      onClick={isAddAccount ? () => {} : null}
    >
      {!isAddAccount && (
        <div
          className="editProfileBtn"
          onClick={() => handleOpenMyCustomModal(profileName)}
        >
          <i className="fa-solid fa-pen"></i>
        </div>
      )}

      {isAddAccount ? (
        <Link className="imgWrapper" to="/auth">
          <img src={addAccountImage} alt="add new Account" />
        </Link>
      ) : (
        <Link className="imgWrapper" to={profileLink}>
          <img
            src={profileImage}
            alt="profile image"
            onError={(event) =>
              handleFallBackImage(event, fallBackProfileImage)
            }
          />
        </Link>
      )}

      <h3 className="profileName">{isAddAccount ? "Add" : profileName}</h3>
    </div>
  );
};

Profile.propTypes = {
  profileName: PropTypes.string,
  profileImage: PropTypes.string,
  isAddAccount: PropTypes.bool,
  handleOpenMyCustomModal: PropTypes.func,
};

export default Profile;
