import "./Profile.scss";
import profile_image from "../../assets/profile_image.png";
import addAccountImage from "../../assets/plusImage.jpg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import fallBackProfileImage from "../../assets/profile_image.png";
import useLocalStorage from "../../hooks/useLocalStorage";

const Profile = ({
  profileName,
  profileImage,
  isAddAccount = false,
  handleOpenMyCustomModal,
}) => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  const { username } = loggedInUser;
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (username !== profileName) {
      navigate("/auth?mode=login");
    }
  };

  const handleAddAccount = () => {
    navigate("/auth");
  };

  return (
    <div
      className={`profileWrapper ${isAddAccount ? "addAccount" : ""}`}
      onClick={isAddAccount ? handleAddAccount : null}
    >
      {!isAddAccount && (
        <div
          className="editProfileBtn"
          onClick={() => {
            handleOpenMyCustomModal(profileName);
          }}
        >
          <i className="fa-solid fa-pen"></i>
        </div>
      )}

      <div className="imgWrapper">
        {isAddAccount ? (
          <img src={addAccountImage} alt="addAccount" />
        ) : (
          <img
            onClick={handleProfileClick}
            src={profileImage}
            alt={profileName}
            onError={(event) => {
              handleFallBackImage(event, fallBackProfileImage);
            }}
          />
        )}
      </div>
      <h3 className="profileName">{isAddAccount ? "Add" : profileName}</h3>
    </div>
  );
};

Profile.propTypes = {
  profileName: PropTypes.string,
  isAddAccount: PropTypes.bool,
  handleOpenMyCustomModal: PropTypes.func,
  profileImage: PropTypes.string,
};

export default Profile;
