import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import fallBackProfileImage from "../../assets/profile_image.png";
import "./AccountSetting.scss";

const AccountSetting = ({ isSideBarOpen }) => {
  const navigate = useNavigate();
  const [isAccountSettingVisible, setIsAccountSettingVisible] = useState(false);
  const { accounts, loggedInUser, removeLoggedInUser } =
    useContext(AuthContext);
  const { username } = loggedInUser;
  const accountSettingRef = useRef(null);

  const handleAccountSettingClick = () => {
    setIsAccountSettingVisible((prevState) => !prevState);
  };

  const handleClickOutside = ({ target }) => {
    if (!accountSettingRef.current?.contains(target)) {
      setIsAccountSettingVisible(false);
    }
  };

  const handleLogOut = () => {
    removeLoggedInUser();
    toast.success("User logged out successfully.");
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileImage = accounts?.find(
    (account) => account.username === username
  )?.profileImg;

  return (
    <div
      className={`accountSetting ${isSideBarOpen ? "sideBarOpen" : ""}`}
      ref={accountSettingRef}
      onClick={handleAccountSettingClick}
    >
      <div className="iconsWrapper">
        <div className="profileImageWrapper">
          <img
            className="userProfileImage"
            src={profileImage}
            alt="profileImage"
            onError={(event) =>
              handleFallBackImage(event, fallBackProfileImage)
            }
          />
        </div>
        <i className="fa-solid fa-chevron-down chevronDown"></i>
      </div>
      {isAccountSettingVisible && (
        <div className="accountSettingOptions">
          <ul>
            <Link to="/manageAccounts">
              <li className="username">
                {username}
                <span className="viewProfile">Manage accounts</span>
              </li>
            </Link>
            <li className="logOut" onClick={handleLogOut}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

AccountSetting.propTypes = {
  isSideBarOpen: PropTypes.bool.isRequired,
};

export default AccountSetting;
