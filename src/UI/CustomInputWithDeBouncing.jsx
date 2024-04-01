import "./CustomInput.scss";
import { debounce } from "../utils/utilityFunctions.js";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";

const CustomInputWithDeBouncing = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = true,
  updateState = () => {},
  inputValidationFn = () => {
    return true;
  },
  errorMessage = "",
}) => {
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const afterDebounce = useCallback(
    (value) => {
      if (value === "") {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      if (inputValidationFn(value)) {
        updateState(value);
        setIsError(false);
      } else {
        setIsError(true);
      }
    },
    [inputValidationFn, updateState]
  );
  const handleDebounce = useCallback(
    debounce((value) => {
      afterDebounce(value);
    }),
    [afterDebounce]
  );
  const myFun = useCallback(
    ({ target: { value } }) => {
      handleDebounce(value);
    },
    [handleDebounce]
  );
  return (
    <>
      <div className="customInputContainer">
        <input
          type={type}
          id={id}
          className={!isEmpty ? "customInput notEmpty" : "customInput"}
          required={required}
          onChange={myFun}
        />
        <label className="floatingLabel">{floatingLabel}</label>
      </div>
      {isError && <div className="errorMessage">{errorMessage}</div>}
    </>
  );
};

CustomInputWithDeBouncing.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  floatingLabel: PropTypes.string,
  required: PropTypes.bool,
  updateState: PropTypes.func,
  inputValidationFn: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default CustomInputWithDeBouncing;
