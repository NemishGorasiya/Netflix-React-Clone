import "./CustomInput.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CustomInput = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = false,
  updateState,
  val,
  isPassword = false,
  errorMessage = "Please fill out this field.",
}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = ({ target: { value } }) => {
    if (value === "") {
      setIsEmpty(true);
      setIsError(true);
    } else {
      setIsError(false);
      if (isEmpty) {
        setIsEmpty(false);
      }
    }
    updateState(value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (val === "") {
      setIsEmpty(true);
    } else {
      if (isEmpty) {
        setIsEmpty(false);
      }
    }
  }, [isEmpty, val]);

  return (
    <>
      <div className={`customInputContainer ${isError ? "hasError" : ""}`}>
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          className={`customInput ${!isEmpty ? "notEmpty" : ""} ${
            isPassword ? "passwordInput" : ""
          }`}
          required={required}
          value={val}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <label className="floatingLabel">{floatingLabel}</label>
        {isPassword && (
          <i
            onClick={handlePasswordVisibility}
            className={`fa-regular fa-eye${
              isPasswordVisible ? "-slash" : ""
            } eyeBtn`}
          ></i>
        )}
        {isError && (
          <div className="errorMessage">
            <i className="fa-regular fa-circle-xmark"></i>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  floatingLabel: PropTypes.string,
  required: PropTypes.bool,
  updateState: PropTypes.func,
  val: PropTypes.string,
  isPassword: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default CustomInput;
