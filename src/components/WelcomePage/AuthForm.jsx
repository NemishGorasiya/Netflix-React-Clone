import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "../../UI/CustomInput";
import "./AuthForm.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../UI/Button";
import { handleTMDBLogin } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import fallBackProfileImage from "../../assets/profile_image.png";

const TMDB_LOGIN_PAGE_LINK = "https://www.themoviedb.org/login";

const AuthForm = () => {
  const [userAuthDetails, setUserAuthDetails] = useState({
    username: { value: "", hasError: false },
    password: { value: "", hasError: false, isVisible: false },
  });

  const { username, password } = userAuthDetails;
  const { value: usernameValue, hasError: usernameHasError } = username;
  const {
    value: passwordValue,
    hasError: passwordHasError,
    isVisible: isPasswordVisible,
  } = password;

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [searchParams] = useSearchParams();
  const isLoginPage = searchParams.get("mode") === "login";

  const handlePasswordVisibility = () => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      password: {
        ...prevDetails.password,
        isVisible: !prevDetails.password.isVisible,
      },
    }));
  };

  const updateField = useCallback((fieldName, value) => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: { ...prevDetails[fieldName], value, hasError: value === "" },
    }));
  }, []);

  const redirectToTMDBPage = () => {
    window.open(TMDB_LOGIN_PAGE_LINK, "_blank");
    navigate("/auth?mode=login");
  };

  const handleSelectUser = (selectedUsername) => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      username: { ...prevDetails.username, value: selectedUsername },
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (usernameValue === "" || passwordValue === "") {
      toast.error("Username or Password should not be empty");
      return;
    }
    const sessionID = await handleTMDBLogin(usernameValue, passwordValue);

    if (!sessionID) {
      toast.error("Invalid credentials.");
    } else {
      setLoggedInUser({ sessionID, username: usernameValue });
      toast.success("Logged In Successfully.");

      const isAlreadyExist = accounts.some(
        (account) => account.username === usernameValue
      );
      if (!isAlreadyExist) {
        setAccounts([...accounts, { username: usernameValue, profileImg: "" }]);
      }

      setUserAuthDetails((prevDetails) => ({
        ...prevDetails,
        username: { ...prevDetails.username, value: "" },
        password: { ...prevDetails.password, value: "" },
      }));
      navigate("/home");
    }
  };

  return (
    <div className="authenticationFormContainer">
      <h1 className="authenticationFormTitle">
        {isLoginPage ? "Login" : "Sign Up"}
      </h1>
      <form className="authenticationForm" onSubmit={handleLogin}>
        {isLoginPage ? (
          <>
            <CustomInput
              onChange={(e) => updateField("username", e.target.value)}
              floatingLabel="Username"
              id="username"
              type="text"
              val={usernameValue}
              hasError={usernameHasError}
            />
            <CustomInput
              onChange={(e) => updateField("password", e.target.value)}
              floatingLabel="Password"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              val={passwordValue}
              hasError={passwordHasError}
              isPassword={true}
              handlePasswordVisibility={handlePasswordVisibility}
              isPasswordVisible={isPasswordVisible}
            />
            <button className="authFormSubmitBtn" type="submit">
              Login
            </button>
          </>
        ) : (
          <Button
            onClick={redirectToTMDBPage}
            className="tmdbSignUpBtn"
            text="TMDB Sign Up"
          />
        )}
      </form>

      {isLoginPage && accounts?.length > 0 && (
        <div className="userListingWrapper">
          {accounts.map(({ username: accountUsername, profileImg }) => (
            <div
              key={accountUsername}
              className="user"
              onClick={() => handleSelectUser(accountUsername)}
            >
              <div className="profileImage">
                <img
                  src={profileImg}
                  alt=""
                  onError={(event) => {
                    handleFallBackImage(event, fallBackProfileImage);
                  }}
                />
              </div>
              <div className="profileDetail">{accountUsername}</div>
            </div>
          ))}
        </div>
      )}

      <p className="conditionToMovePage">
        {isLoginPage
          ? "New User ? Register Now."
          : "Already have a TMDB Account ?"}
      </p>

      <Link to={`/auth?mode=${isLoginPage ? "signUp" : "login"}`}>
        Move to {isLoginPage ? "SignUp" : "Login"} Page{" "}
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default AuthForm;
