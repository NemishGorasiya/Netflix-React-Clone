import { useEffect, useRef, useState } from "react";
import "./AccountSetting.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const AccountSetting = ({ isSideBarOpen }) => {
  const [isAccountSettingVisible, setIsAccountSettingVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", {});
  const { username } = loggedInUser;
  const navigate = useNavigate();
  const accountSettingRef = useRef(null);
  const handleAccountSettingClick = () => {
    setIsAccountSettingVisible((prevState) => !prevState);
  };
  const handleClickOutside = ({ target }) => {
    if (
      accountSettingRef.current &&
      !accountSettingRef.current.contains(target)
    ) {
      setIsAccountSettingVisible(false);
    }
  };
  const handleLogOut = () => {
    setLoggedInUser(null);
    toast.success("User LoggedOut successfully.");
    navigate("/");
  };
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
        <i className="fa-solid fa-user"></i>
        <i className="fa-solid fa-chevron-down chevronDown"></i>
      </div>
      {isAccountSettingVisible && (
        <div className="accountSettingOptions">
          <ul>
            <li className="username">
              {username}
              <Link to={"/manageAccounts"} className="viewProfile">
                manage accounts
              </Link>
            </li>
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
