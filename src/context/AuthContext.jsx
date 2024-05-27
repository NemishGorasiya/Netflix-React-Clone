import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser, removeLoggedInUser] = useLocalStorage(
    "loggedInUser",
    null
  );
  const [accounts, setAccounts] = useLocalStorage("accounts", []);

  const [isLoggedIn, setIsLoggedIn] = useState(!!loggedInUser?.sessionID);

  useEffect(() => {
    setIsLoggedIn(!!loggedInUser?.sessionID);
  }, [loggedInUser]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        isLoggedIn,
        setLoggedInUser,
        removeLoggedInUser,
        accounts,
        setAccounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
