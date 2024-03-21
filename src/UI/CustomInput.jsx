import "./CustomInput.scss";
import { debounce } from "../utils/utilityFunctions.js";
import { useCallback, useEffect, useState } from "react";

const CustomInput = ({
  type = "text",
  id,
  floatingLabel = "Enter here ...",
  required = true,
  updateState,
  val,
}) => {
  const [isEmpty, setIsEmpty] = useState(true);

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
      <div className="customInputContainer">
        <input
          type={type}
          id={id}
          className={!isEmpty ? "customInput notEmpty" : "customInput"}
          required
          value={val}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <label className="floatingLabel">{floatingLabel}</label>
      </div>
    </>
  );
};

export default CustomInput;
