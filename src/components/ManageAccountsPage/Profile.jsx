import "./Profile.scss";
import profile_image from "../../assets/profile_image.png";
import addAccountImage from "../../assets/plusImage.jpg";

const Profile = ({ profileName, onClick, isAddAccountDiv = false }) => {
  if (isAddAccountDiv) {
    return (
      <div className="profileWrapper" onClick={onClick}>
        <img src={addAccountImage} alt="addAccount" />
        <h3 className="profileName">Add</h3>
      </div>
    );
  } else {
    return (
      <div className="profileWrapper">
        <img src={profile_image} alt={profileName} />
        <h3 className="profileName">{profileName}</h3>
      </div>
    );
  }
};

export default Profile;
