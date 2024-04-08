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
	const [userAuthDetails, setUserAuthDetails] = useState({
		username: "",
		password: "",
	});
	const { username, password } = userAuthDetails;
	const [_loggedInUser, setLoggedInUser] = useLocalStorage(
		"loggedInUser",
		null
	);
	const [_accounts, setAccounts] = useLocalStorage("accounts", null);

	const [searchParams] = useSearchParams();
	const isLoginPage = searchParams.get("mode") === "login";
	const navigate = useNavigate();

	const updateUsername = ({ target: { value } }) => {
		setUserAuthDetails((prevDetails) => ({ ...prevDetails, username: value }));
	};
	const updatePassword = ({ target: { value } }) => {
		setUserAuthDetails((prevDetails) => ({ ...prevDetails, password: value }));
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
			toast.error("Invalid credentials.");
		} else {
			setLoggedInUser({
				sessionID: sessionID,
				username: username,
			});
			toast.success("LoggedIn Successfully.");
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
		setUserAuthDetails((prevDetails) => ({
			...prevDetails,
			username: "",
			password: "",
		}));
	};

	useEffect(() => {
		if (isLoginPage) {
			setUserAuthDetails((prevDetails) => ({
				...prevDetails,
				username: "",
				password: "",
			}));
		}
	}, [isLoginPage]);

	return (
		<div className="authenticationFormContainer">
			<h1 className="authenticationFormTitle">{`${
				isLoginPage ? "Login" : "Sign Up"
			}`}</h1>
			<form className="authenticationForm" onSubmit={handleLogin}>
				{!isLoginPage && (
					<>
						<Button
							onClick={redirectToTMDBPage}
							className={"tmdbSignUpBtn"}
							text={`TMDB Sign Up`}
						/>
					</>
				)}
				{isLoginPage && (
					<>
						<CustomInput
							onChange={updateUsername}
							floatingLabel="Username"
							id="username"
							type="text"
							val={username}
						/>
						<CustomInput
							onChange={updatePassword}
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

			<Link to={`/auth?mode=${isLoginPage ? "signUp" : "login"}`}>
				Move to {isLoginPage ? "SignUp" : "Login"} Page&nbsp;{" "}
				<i className="fa-solid fa-arrow-right"></i>
			</Link>
		</div>
	);
};

export default AuthForm;
