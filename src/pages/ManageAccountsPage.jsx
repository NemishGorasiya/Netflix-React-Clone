import "./ManageAccountsPage.scss";
import Profile from "../components/ManageAccountsPage/Profile.jsx";
import CustomModal from "../components/common/CustomModal.jsx";
import Button from "../components/common/Button.jsx";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import fallBackProfileImage from "../assets/profile_image.png";
import { handleFallBackImage } from "../utils/utilityFunctions.js";
import { AuthContext } from "../context/AuthContext.jsx";

const ManageAccountsPage = () => {
  const { accounts, setAccounts } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameToEdit, setUsernameToEdit] = useState();
  const [profileImage, setProfileImage] = useState();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadImageChange = ({ target: { files } }) => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setProfileImage(reader.result);
    };
  };

  const openModal = (profileName) => {
    setIsModalOpen(true);
    setUsernameToEdit(profileName);
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    setAccounts((accounts) => {
      const tempArr = [...accounts];
      const idx = tempArr.findIndex(
        (account) => account.username === usernameToEdit
      );
      if (idx !== -1) {
        tempArr[idx].profileImg = profileImage;
        toast.success("Your profile edited successfully.");
      }
      return tempArr;
    });
    setIsModalOpen(false);
    setProfileImage(null);
  };

  return (
    <div className="manageAccountsPage">
      {isModalOpen && (
        <CustomModal handleClose={closeModal}>
          <form className="editProfileForm" onSubmit={handleEditProfile}>
            <div className="inputWrapper">
              <label htmlFor="profileName">Profile Name</label>
              <input
                type="text"
                id="profileName"
                value={usernameToEdit}
                readOnly={true}
                className="useNameInput"
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="profileImg">Profile Image</label>
              <input
                className="profileImageInput"
                type="file"
                id="profileImg"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleUploadImageChange}
                required
              />
              {profileImage && (
                <img
                  className="profileImagePreview"
                  src={profileImage}
                  alt="profile image preview"
                  onError={(event) => {
                    handleFallBackImage(event, fallBackProfileImage);
                  }}
                />
              )}
            </div>
            <div className="editBtnWrapper">
              <Button type="submit" text="Edit Profile" />
            </div>
          </form>
        </CustomModal>
      )}
      <div className="manageAccountsPageContentWrapper">
        <h1 className="manageAccountsHeading">Who&apos;s Watching?</h1>
        <div className="profiles">
          {accounts?.map(({ username, profileImg }) => (
            <Profile
              key={username}
              profileName={username}
              profileImage={profileImg}
              handleOpenMyCustomModal={openModal}
            />
          ))}
          <Profile profileName="Add" isAddAccount />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountsPage;
