import "./SignUpEmail.scss";
import CustomInput from "../../UI/CustomInput.jsx";
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
        val={value}
        onChange={handleEmailChange}
        className="signUpCustomInput"
        errorMessage="Email is required."
        hasError={hasError}
      />
      <button>
        Get Started <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default SignUpEmail;