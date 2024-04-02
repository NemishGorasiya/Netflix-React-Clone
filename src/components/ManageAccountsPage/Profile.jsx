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
  isAddAccountDiv = false,
  handleOpenMyCustomModal,
}) => {
  const [loggedInUser] = useLocalStorage("loggedInUser", null);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (loggedInUser.username !== profileName) {
      navigate("/auth?mode=login");
    }
  };

  const handleAddAccount = () => {
    navigate("/auth");
  };
  if (isAddAccountDiv) {
    return (
      <div className="profileWrapper addAccount" onClick={handleAddAccount}>
        <div className="imgWrapper">
          <img src={addAccountImage} alt="addAccount" />
        </div>
        <h3 className="profileName">Add</h3>
      </div>
    );
  } else {
    return (
      <div className="profileWrapper">
        <div
          className="editProfileBtn"
          onClick={() => {
            handleOpenMyCustomModal(profileName);
          }}
        >
          <i className="fa-solid fa-pen"></i>
        </div>
        <div className="imgWrapper">
          <img
            onClick={handleProfileClick}
            src={profileImage === "" ? profile_image : profileImage}
            alt={profileName}
            onError={(event) => {
              handleFallBackImage(event, fallBackProfileImage);
            }}
          />
        </div>
        <h3 className="profileName">{profileName}</h3>
      </div>
    );
  }
};

Profile.propTypes = {
  profileName: PropTypes.string,
  isAddAccountDiv: PropTypes.bool,
  handleOpenMyCustomModal: PropTypes.func,
  profileImage: PropTypes.string,
};

export default Profile;
