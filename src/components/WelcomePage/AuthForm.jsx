import { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "../../UI/CustomInput";
import "./AuthForm.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../UI/Button";
import { handleTMDBLogin } from "../../services/services";
import { handleFallBackImage } from "../../utils/utilityFunctions";
import fallBackProfileImage from "../../assets/profile_image.png";
import { AuthContext } from "../../context/AuthContext";

const TMDB_LOGIN_PAGE_LINK = "https://www.themoviedb.org/login";

const AuthForm = () => {
  const { setLoggedInUser, accounts, setAccounts } = useContext(AuthContext);
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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoginPage = searchParams.get("mode") === "login";

  const handlePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prevState) => !prevState);
  }, []);

  const updateField = useCallback((event, fieldName) => {
    const { value } = event.target;
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
    setValidationStatus((prevState) => ({
      ...prevState,
      [fieldName]: value === "",
    }));
  }, []);

  const redirectToTMDBPage = useCallback(() => {
    window.open(TMDB_LOGIN_PAGE_LINK, "_blank");
    navigate("/auth?mode=login");
  }, [navigate]);

  const handleSelectUser = useCallback((selectedUsername) => {
    setUserAuthDetails((prevDetails) => ({
      ...prevDetails,
      username: selectedUsername,
    }));
  }, []);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { username, password } = userAuthDetails;

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
          setLoggedInUser({ sessionID, username });
          toast.success("Logged In Successfully.");
          if (!accounts.some((account) => account.username === username)) {
            setAccounts([...accounts, { username, profileImg: "" }]);
          }
          setUserAuthDetails({ username: "", password: "" });
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoginBtnDisabled(false);
      }
    },
    [userAuthDetails, accounts, setLoggedInUser, setAccounts, navigate]
  );

  return (
    <div className="authenticationFormContainer">
      <h1 className="authenticationFormTitle">
        {isLoginPage ? "Login" : "Sign Up"}
      </h1>
      <form className="authenticationForm" onSubmit={handleLogin}>
        {isLoginPage ? (
          <>
            <CustomInput
              onChange={(e) => updateField(e, "username")}
              floatingLabel="Username"
              id="username"
              type="text"
              val={userAuthDetails.username}
              hasError={validationStatus.username}
              errorMessage="Username should not be empty"
            />
            <CustomInput
              onChange={(e) => updateField(e, "password")}
              floatingLabel="Password"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              val={userAuthDetails.password}
              hasError={validationStatus.password}
              handlePasswordVisibility={handlePasswordVisibility}
              isPasswordVisible={isPasswordVisible}
              errorMessage="Password should not be empty"
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

      {isLoginPage && accounts.length > 0 && (
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
                  onError={(event) =>
                    handleFallBackImage(event, fallBackProfileImage)
                  }
                />
              </div>
              <div className="profileDetail">{accountUsername}</div>
            </div>
          ))}
        </div>
      )}

      <Link to={`/auth?mode=${isLoginPage ? "signUp" : "login"}`}>
        {isLoginPage
          ? "New User? Register Now."
          : "Already have a TMDB Account?"}
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default AuthForm;
