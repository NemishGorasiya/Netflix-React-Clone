import { memo } from "react";
import "./CustomInput.scss";
import PropTypes from "prop-types";

const CustomInput = memo(
  ({
    type = "text",
    id,
    floatingLabel = "Enter here ...",
    required = false,
    onChange,
    value,
    hasError,
    errorMessage = "Please fill out this field.",
    isPasswordVisible,
    handlePasswordVisibility,
  }) => {
    return (
      <div className={`customInputContainer ${hasError ? "hasError" : ""}`}>
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          aria-labelledby={id}
          className={`customInput ${value ? "notEmpty" : ""} ${
            type === "password" ? "passwordInput" : ""
          }`}
          required={required}
          value={value}
          autoComplete="off"
          onChange={(event) => {
            onChange(event, id);
          }}
        />

        <label className="floatingLabel">{floatingLabel}</label>
        {id === "password" && (
          <i
            onClick={handlePasswordVisibility}
            className={`fa-regular fa-eye${
              isPasswordVisible ? "-slash" : ""
            } eyeBtn`}
          ></i>
        )}
        {!value && (
          <div className="errorMessage">
            <i className="fa-regular fa-circle-xmark"></i>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

CustomInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  floatingLabel: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  handlePasswordVisibility: PropTypes.func,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isPasswordVisible: PropTypes.bool,
};

CustomInput.displayName = "CustomInput";
export default CustomInput;
