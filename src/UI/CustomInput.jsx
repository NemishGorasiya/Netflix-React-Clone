import "./CustomInput.scss";
import { debounce } from "../utils/utilityFunctions.js";
import { useCallback, useState } from "react";

const CustomInput = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = true,
  updateState,
  inputValidationFn,
  errorMessage,
}) => {
  const [isError, setIsError] = useState(false);

  const afterDebounce = useCallback(
    (value) => {
      if (inputValidationFn(value)) {
        console.log("finally", value);
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
          className="customInput"
          required
          onChange={myFun}
        />
        <label className="floatingLabel">{floatingLabel}</label>
      </div>
      {isError && <div className="errorMessage">{errorMessage}</div>}
    </>
  );
};

export default CustomInput;
