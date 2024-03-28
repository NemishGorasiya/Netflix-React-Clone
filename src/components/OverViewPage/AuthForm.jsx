import { useEffect, useState } from "react";
import CustomInput from "../../UI/CustomInput";
import "./AuthForm.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../UI/Button";
import { handleTMDBLogin } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const [accounts, setAccounts] = useLocalStorage("accounts", null);

  const [searchParamas] = useSearchParams();
  const isLoginPage = searchParamas.get("mode") === "login";
  const navigate = useNavigate();

  const updateUsername = (val) => {
    setUsername(val);
  };
  const updatePassword = (val) => {
    setPassword(val);
  };
  const redirectToTMDBPage = () => {
    window.open("https://www.themoviedb.org/login", "_blank");
    navigate("/auth?mode=login");
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    const sessionID = await handleTMDBLogin(username, password);
    if (!sessionID) {
      alert("invlid credentials");
    } else {
      console.log("sessionID", sessionID);
      setLoggedInUser({
        sessionID: sessionID,
        username: username,
      });
      setAccounts((accountsInfo) => {
        if (!accountsInfo) {
          return [{ username: username, profileImg: "" }];
        }
        let isAlreadyExist = false;
        accountsInfo.forEach((account) => {
          console.log(account);
          console.log(account.username);
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
              floatingLabel="Enter Username"
              required={true}
              id="username"
              type="text"
              val={username}
            />
            <CustomInput
              updateState={updatePassword}
              floatingLabel="Enter Password"
              required={true}
              id="password"
              type="password"
              val={password}
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
