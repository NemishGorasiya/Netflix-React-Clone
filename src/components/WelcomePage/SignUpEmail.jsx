import { Link } from "react-router-dom";
import CustomInput from "../common/CustomInput";
import "./SignUpEmail.scss";
import { useState } from "react";

const SignUpEmail = () => {
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
  });
  const { value, hasError } = email;

  const handleEmailChange = ({ target: { value } }) => {
    setEmail((prevValue) => ({
      ...prevValue,
      value: value,
      hasError: value === "",
    }));
  };

  return (
    <div className="signUpEmailWrapper">
      <CustomInput
        floatingLabel="Email address"
        required={true}
        id="email"
        type="email"
        value={value}
        onChange={handleEmailChange}
        className="signUpCustomInput"
        errorMessage="Email is required."
        hasError={hasError}
      />

      <button>
        <Link to="/auth?mode=login">
          Get Started <i className="fa-solid fa-angle-right" />
        </Link>
      </button>
    </div>
  );
};

export default SignUpEmail;
