import "./ManageAccountsPage.scss";
import Profile from "../components/ManageAccountsPage/Profile.jsx";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import CustomModal from "../UI/CustomModal.jsx";
import Button from "../UI/Button.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
import fallBackProfileImage from "../assets/profile_image.png";
import { handleFallBackImage } from "../utils/utilityFunctions.js";

const ManageAccountsPage = () => {
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [usernameOfProfileToEdit, setUsernameOfProfileToEdit] = useState();
  const [profileImage, setProfileImage] = useState();

  const handleCloseMyCustomModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleUploadImageChange = ({ target: { files } }) => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setProfileImage(reader.result);
    };
  };

  const handleOpenMyCustomModal = (profileName) => {
    setIsEditProfileModalOpen(true);
    setUsernameOfProfileToEdit(profileName);
  };

  const handleEditProfileBtnClick = (event) => {
    event.preventDefault();
    setAccounts((accounts) => {
      console.log("acc", accounts);
      const tempArr = [...accounts];
      const idx = tempArr.findIndex(
        (account) => account.username === usernameOfProfileToEdit
      );
      if (idx !== -1) {
        tempArr[idx].profileImg = profileImage;
        toast.success("Your profile edited successfully.");
      }
      console.log("temp", tempArr);
      return tempArr;
    });
    setIsEditProfileModalOpen(false);
    setProfileImage(null);
  };

  return (
    <div className="manageAccountsPage">
      {isEditProfileModalOpen && (
        <CustomModal
          shouldCloseOnOutSideClick={true}
          handleCloseMyCustomModal={handleCloseMyCustomModal}
        >
          <form
            action=""
            className="editProfileForm"
            onSubmit={handleEditProfileBtnClick}
          >
            <div className="inputWrapper">
              <label htmlFor="profileName">Profile Name</label>
              <input
                type="text"
                id={"profileName"}
                value={usernameOfProfileToEdit}
                readOnly={true}
                className="useNameInput"
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="profileImg">Profile Image</label>
              <input
                className="profileImageInput"
                type="file"
                name=""
                id="profileImg"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleUploadImageChange}
                required
              />
              {profileImage && (
                <img
                  className="profileImagePreview"
                  src={profileImage}
                  alt="profileImagePreview"
                  onError={(event) => {
                    handleFallBackImage(event, fallBackProfileImage);
                  }}
                />
              )}
            </div>
            <div className="editBtnWrapper">
              <Button text="Edit Profile" />
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
              handleOpenMyCustomModal={handleOpenMyCustomModal}
            />
          ))}
          <Profile profileName={"Add"} isAddAccount />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountsPage;
