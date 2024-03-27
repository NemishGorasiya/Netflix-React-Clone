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
          required={required}
          value={val}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <label className="floatingLabel">{floatingLabel}</label>
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
};

export default CustomInput;
