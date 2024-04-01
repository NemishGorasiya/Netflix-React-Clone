import "./CustomInput.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CustomInput = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = true,
  updateState,
  val,
  isPassword = false,
  errorMessage = "Enter valid",
  style,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setIsEmpty(true);
    } else {
      if (isEmpty) {
        setIsEmpty(false);
      }
    }
    updateState(event.target.value);
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
      <div className="customInputContainer" style={style}>
        <input
          type={isPasswordVisible ? "text" : type}
          id={id}
          className={!isEmpty ? "customInput notEmpty" : "customInput"}
          required={required}
          value={val}
          autoComplete="off"
          onChange={handleInputChange}
          style={isPassword ? { paddingRight: "35px" } : {}}
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
  style: PropTypes.object,
};

export default CustomInput;
