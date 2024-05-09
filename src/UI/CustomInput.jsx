import { memo } from "react";
import "./CustomInput.scss";
import PropTypes from "prop-types";

const CustomInput = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = false,
  onChange,
  val,
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
        className={`customInput ${val ? "notEmpty" : ""} ${
          type === "password" ? "passwordInput" : ""
        }`}
        required={required}
        value={val}
        autoComplete="off"
        onChange={({ target: { value } }) => {
          onChange(id, value);
        }}
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
  handlePasswordVisibility: PropTypes.func,
  val: PropTypes.string,
  isPassword: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  isPasswordVisible: PropTypes.bool,
};

const MemoizedCustomInput = memo(CustomInput);
export default MemoizedCustomInput;

// export default memo(CustomInput);
