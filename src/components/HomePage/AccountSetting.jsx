import { useEffect, useRef, useState } from "react";
import "./AccountSetting.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import fallBackProfileImage from "../../assets/profile_image.png";

const AccountSetting = ({ isSideBarOpen }) => {
  const [isAccountSettingVisible, setIsAccountSettingVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const { username } = loggedInUser;
  const navigate = useNavigate();
  const accountSettingRef = useRef(null);
  const [accounts] = useLocalStorage("accounts", []);

  const handleAccountSettingClick = () => {
    setIsAccountSettingVisible((prevState) => !prevState);
  };

  const handleClickOutside = ({ target }) => {
    if (!accountSettingRef.current?.contains(target)) {
      setIsAccountSettingVisible(false);
    }
  };

  const handleLogOut = () => {
    setLoggedInUser(null);
    toast.success("User LoggedOut successfully.");
    navigate("/");
  };

  const profileImage = accounts?.find(
    (account) => account.username === username
  )?.profileImg;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={
        isSideBarOpen ? "accountSetting sideBarOpen" : "accountSetting"
      }
      ref={accountSettingRef}
      onClick={handleAccountSettingClick}
    >
      <div className="iconsWrapper">
        <div className="profileImageWrapper">
          <img
            className="userProfileImage"
            src={profileImage}
            alt=""
            onError={(event) => {
              handleFallBackImage(event, fallBackProfileImage);
            }}
          />
        </div>
        <i className="fa-solid fa-chevron-down chevronDown"></i>
      </div>
      {isAccountSettingVisible && (
        <div className="accountSettingOptions">
          <ul>
            <Link to={"/manageAccounts"}>
              <li className="username">
                {username}
                <span className="viewProfile">manage accounts</span>
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
  isSideBarOpen: PropTypes.bool,
};

export default AccountSetting;
