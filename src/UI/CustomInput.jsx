import "./CustomInput.scss";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

const CustomInput = ({
	type = "text",
	id,
	floatingLabel = "Enter here ...",
	required = false,
	onChange,
	val,
	errorMessage = "Please fill out this field.",
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const inputContainerRef = useRef(null);

	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	return (
		<div
			ref={inputContainerRef}
			className={`customInputContainer ${val ? "" : "hasError"}`}
		>
			<input
				type={isPasswordVisible ? "text" : type}
				id={id}
				className={`customInput ${val ? "notEmpty" : ""} ${
					type === "password" ? "passwordInput" : ""
				}`}
				required={required}
				value={val}
				autoComplete="off"
				onChange={onChange}
			/>

			<label className="floatingLabel">{floatingLabel}</label>
			{type === "password" && (
				<i
					onClick={handlePasswordVisibility}
					className={`fa-regular fa-eye${
						isPasswordVisible ? "-slash" : ""
					} eyeBtn`}
				></i>
			)}
			{!val && (
				<div className="errorMessage">
					<i className="fa-regular fa-circle-xmark"></i>
					{errorMessage}
				</div>
			)}
		</div>
	);
};

CustomInput.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	floatingLabel: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
	val: PropTypes.string,
	isPassword: PropTypes.bool,
	errorMessage: PropTypes.string,
};

export default CustomInput;
