import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "../../UI/CustomInput";
import "./AuthForm.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../UI/Button";
import { handleTMDBLogin } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";

const TMDB_LOGIN_PAGE_LINK = "https://www.themoviedb.org/login";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_loggedInUser, setLoggedInUser] = useLocalStorage(
    "loggedInUser",
    null
  );
  const [_accounts, setAccounts] = useLocalStorage("accounts", null);

  const [searchParams] = useSearchParams();
  const isLoginPage = searchParams.get("mode") === "login";
  const navigate = useNavigate();

  const updateUsername = (val) => {
    setUsername(val);
  };
  const updatePassword = (val) => {
    setPassword(val);
  };
  const redirectToTMDBPage = () => {
    window.open(TMDB_LOGIN_PAGE_LINK, "_blank");
    navigate("/auth?mode=login");
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      return;
    }

    const sessionID = await handleTMDBLogin(username, password);
    if (!sessionID) {
      toast.error("Invalid credentials.", {
        duration: 2500,
      });
    } else {
      setLoggedInUser({
        sessionID: sessionID,
        username: username,
      });
      toast.success("LoggedIn Successfully.", {
        duration: 2500,
      });
      setAccounts((accountsInfo) => {
        if (!accountsInfo) {
          return [{ username: username, profileImg: "" }];
        }
        let isAlreadyExist = false;
        accountsInfo.forEach((account) => {
          if (account.username === username) {
            isAlreadyExist = true;
            return;
          }
        });
        if (isAlreadyExist) {
          return accountsInfo;
        }
        return [...accountsInfo, { username: username, profileImg: "" }];
      });
      navigate("/home");
    }
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (isLoginPage) {
      setUsername("");
      setPassword("");
    }
  }, [isLoginPage]);

  return (
    <div className="authenticationFormContainer">
      <h1 style={{ color: "white" }}>
        {`${isLoginPage ? "Login" : "Sign Up"}`}
      </h1>
      <form className="authenticationForm" onSubmit={handleLogin}>
        {!isLoginPage && (
          <>
            <Button
              onClick={redirectToTMDBPage}
              style={{
                background: "#01B4E4",
              }}
              className={"tmdbSignUpBtn"}
              text={`TMDB Sign Up`}
            />
          </>
        )}
        {isLoginPage && (
          <>
            <CustomInput
              updateState={updateUsername}
              floatingLabel="Username"
              id="username"
              type="text"
              val={username}
            />
            <CustomInput
              updateState={updatePassword}
              floatingLabel="Password"
              id="password"
              type="password"
              val={password}
              isPassword={true}
            />
            <button className="authFormSubmitBtn" type="submit">
              Login
            </button>
          </>
        )}
      </form>

      <p className="conditionToMovePage">
        {isLoginPage
          ? "New User ? Register Now."
          : "Already have a TMDB Account ?"}
      </p>

      <Link to={`/auth?mode=${isLoginPage ? "signup" : "login"}`}>
        Move to {isLoginPage ? "Signup" : "Login"} Page&nbsp;{" "}
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default AuthForm;
