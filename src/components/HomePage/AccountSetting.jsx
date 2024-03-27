import { useEffect, useRef, useState } from "react";
import "./AccountSetting.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AccountSetting = ({ isSideBarOpen }) => {
  const [isAccountSettingVisible, setIsAccountSettingVisible] = useState(false);
  const [loggedInUser] = useLocalStorage("loggedInUser", {});

  const accountSettingRef = useRef(null);
  const handleAccountSettingClick = () => {
    setIsAccountSettingVisible((prevState) => !prevState);
  };
  const handleClickOutside = (event) => {
    if (
      accountSettingRef.current &&
      !accountSettingRef.current.contains(event.target)
    ) {
      setIsAccountSettingVisible(false);
    }
  };
  useEffect(() => {}, []);

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
        <i className="fa-solid fa-chevron-down cheveronDown"></i>
      </div>
      {isAccountSettingVisible && (
        <div className="accountSettingOptions">
          <ul>
            <li className="username">
              {loggedInUser.username}
              <Link to={"/manageAccounts"} className="viewProfile">
                manage accounts
              </Link>
            </li>
            <li>Setting</li>
            <li>Logout</li>
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
