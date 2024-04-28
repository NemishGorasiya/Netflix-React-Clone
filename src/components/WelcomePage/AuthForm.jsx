import { useState } from "react";
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
		username: {
			value: "",
			hasError: false,
		},
		password: {
			value: "",
			hasError: false,
			isVisible: false,
		},
	});

	const {
		username: { value: username, hasError: usernameHasError },
		password: {
			value: password,
			hasError: passwordHasError,
			isVisible: isPasswordVisible,
		},
	} = userAuthDetails;

	const navigate = useNavigate();
	const [, setLoggedInUser] = useLocalStorage("loggedInUser", null);
	const [accounts, setAccounts] = useLocalStorage("accounts", null);
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

	const updateUsername = ({ target: { value } }) => {
		setUserAuthDetails((prevDetails) => ({
			...prevDetails,
			username: {
				...prevDetails.username,
				value: value,
				hasError: value === "",
			},
		}));
	};

	const updatePassword = ({ target: { value } }) => {
		setUserAuthDetails((prevDetails) => ({
			...prevDetails,
			password: {
				...prevDetails.password,
				value: value,
				hasError: value === "",
			},
		}));
	};

	const redirectToTMDBPage = () => {
		window.open(TMDB_LOGIN_PAGE_LINK, "_blank");
		navigate("/auth?mode=login");
	};

	const handleSelectUser = (username) => {
		setUserAuthDetails((prevDetails) => ({
			...prevDetails,
			username: {
				...prevDetails.username,
				value: username,
			},
		}));
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		if (username === "" || password === "") {
			toast.error("Username or Password should not be empty");
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
							hasError={usernameHasError}
						/>
						<CustomInput
							onChange={updatePassword}
							floatingLabel="Password"
							id="password"
							type="password"
							val={password}
							isPassword={true}
							hasError={passwordHasError}
							handlePasswordVisibility={handlePasswordVisibility}
							isPasswordVisible={isPasswordVisible}
						/>
						<button className="authFormSubmitBtn" type="submit">
							Login
						</button>
					</>
				)}
			</form>

			{isLoginPage && (
				<div className="userListingWrapper">
					{accounts.map(({ username, profileImg }) => (
						<div
							key={username}
							className="user"
							onClick={() => {
								handleSelectUser(username);
							}}
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
							<div className="profileDetail">{username}</div>
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
				Move to {isLoginPage ? "SignUp" : "Login"} Page&nbsp;{" "}
				<i className="fa-solid fa-arrow-right"></i>
			</Link>
		</div>
	);
};

export default AuthForm;
