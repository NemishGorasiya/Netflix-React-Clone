import "./ManageAccountsPage.scss";
import HomePageNavBar from "../components/HomePage/HomePageNavBar.jsx";
import Profile from "../components/ManageAccountsPage/Profile.jsx";
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import CustomModal from "../UI/CustomModal.jsx";
import Button from "../UI/Button.jsx";
import { useState } from "react";

const ManageAccountsPage = () => {
  const [accounts, setAccounts] = useLocalStorage("accounts", null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [usernameOfProfileToEdit, setUsernameOfProfileToEdit] = useState();
  const [profileImage, setProfileImage] = useState();
  const handleAddAccount = () => {
    console.log("add account called");
  };
  const handleCloseMyCustomModal = () => {
    setIsEditProfileModalOpen(false);
  };
  const handleUploadImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleOpenMyCustomModal = (profileName) => {
    setIsEditProfileModalOpen(true);
    setUsernameOfProfileToEdit(profileName);
  };

  const handleEditProfileBtnClick = (event) => {
    event.preventDefault();
    setAccounts((accountsInfo) => {
      const tempArr = [...accountsInfo];
      const idx = tempArr.findIndex(
        (account) => account.username === usernameOfProfileToEdit
      );
      tempArr[idx].profileImg = profileImage;
      return tempArr;
    });
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="manageAccountsPage">
      <HomePageNavBar />
      {isEditProfileModalOpen && (
        <CustomModal
          shouldCloseOnOutSideClick={false}
          handleCloseMyCustomModal={handleCloseMyCustomModal}
        >
          <form action="" className="editProfileForm">
            <div className="inputWrapper">
              <label htmlFor="profileName">Profile Name</label>
              <input
                type="text"
                id={"profileName"}
                value={usernameOfProfileToEdit}
                readOnly={true}
                style={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "10px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  border: "1px solid #000",
                  cursor: "no-drop",
                  margin: "5px 0 15px",
                }}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="profileImg">Profile Image</label>
              <input
                style={{
                  width: "100%",
                }}
                type="file"
                name=""
                id="profileImg"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleUploadImageChange}
              />
              {profileImage && (
                <img
                  style={{ height: "150px", width: "150px" }}
                  src={profileImage}
                  alt="profileImagePreview"
                />
              )}
            </div>
            <div
              className="editBtnWrapper"
              style={{
                textAlign: "center",
              }}
            >
              <Button
                style={{
                  padding: "8px 15px",
                  background: "grey",
                  border: "none",
                  color: "#fff",
                  borderRadius: "5px",
                  fontSize: "18px",
                }}
                text="Edit Profile"
                onClick={handleEditProfileBtnClick}
              />
            </div>
          </form>
        </CustomModal>
      )}

      <div className="manageAccountsPageContentWrapper">
        <h1 className="manageAccountsHeading">Who's Watching?</h1>
        <div className="profiles">
          {accounts?.map((account) => (
            <Profile
              key={account.username}
              profileName={account.username}
              profileImage={account.profileImg}
              handleOpenMyCustomModal={handleOpenMyCustomModal}
            />
          ))}
          <Profile
            profileName={"Add"}
            isAddAccountDiv={true}
            onClick={handleAddAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountsPage;
