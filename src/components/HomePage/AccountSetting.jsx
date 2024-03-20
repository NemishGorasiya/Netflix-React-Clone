import { useEffect, useRef, useState } from "react";
import "./AccountSetting.scss";

const AccountSetting = ({ isSideBarOpen }) => {
  const [isAccountSettingVisible, setIsAccountSettingVisible] = useState(false);
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

  useEffect(() => {
    console.log("called");
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
      <i className="fa-solid fa-user"></i>
      <i className="fa-solid fa-chevron-down cheveronDown"></i>
      {isAccountSettingVisible && <div className="accountSettingOptions"></div>}
    </div>
  );
};

export default AccountSetting;
