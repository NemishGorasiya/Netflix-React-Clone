import { useCallback, useState } from "react";
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
    username: "",
    password: "",
  });

  const [validationStatus, setValidationStatus] = useState({
    username: false,
    password: false,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(false);

  const { username, password } = userAuthDetails;
  const { username: usernameHasError, password: passwordHasError } =
    validationStatus;

  const navigate = useNavigate();
  const [, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const [accounts, setAccounts] = useLocalStorage("accounts", []);
  const [searchParams] = useSearchParams();
  const isLoginPage = searchParams.get("mode") === "login";

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prevState) => !prevState);
  }, []);

  const updateField = useCallback((fieldName, value) => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
    setValidationStatus((prevState) => ({
      ...prevState,
      [fieldName]: value === "",
    }));
  }, []);

  const redirectToTMDBPage = () => {
    window.open(TMDB_LOGIN_PAGE_LINK, "_blank");
    navigate("/auth?mode=login");
  };

  const handleSelectUser = (selectedUsername) => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      username: selectedUsername,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      toast.error("Username or Password should not be empty");
      return;
    }
    setIsLoginBtnDisabled(true);
    try {
      const sessionID = await handleTMDBLogin(username, password);
      if (!sessionID) {
        toast.error("Invalid credentials.");
      } else {
        setLoggedInUser({ sessionID, username: username });
        toast.success("Logged In Successfully.");
        const isAlreadyExist = accounts.some(
          (account) => account.username === username
        );
        if (!isAlreadyExist) {
          setAccounts([...accounts, { username: username, profileImg: "" }]);
        }
        setUserAuthDetails((prevDetails) => ({
          ...prevDetails,
          username: "",
          password: "",
        }));
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoginBtnDisabled(false);
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
              onChange={updateField}
              floatingLabel="Username"
              id="username"
              type="text"
              val={username}
              hasError={usernameHasError}
            />
            <CustomInput
              onChange={updateField}
              floatingLabel="Password"
              id="password"
              type="password"
              val={password}
              hasError={passwordHasError}
              isPassword={true}
              handlePasswordVisibility={handlePasswordVisibility}
              isPasswordVisible={isPasswordVisible}
            />
            <button
              className="authFormSubmitBtn"
              type="submit"
              disabled={isLoginBtnDisabled}
            >
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

      <Link to={`/auth?mode=${isLoginPage ? "signUp" : "login"}`}>
        {isLoginPage
          ? "New User ? Register Now. "
          : "Already have a TMDB Account ? "}
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default AuthForm;
