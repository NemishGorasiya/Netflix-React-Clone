import "./SignUpEmail.scss";
import CustomInput from "../../UI/CustomInput.jsx";
import { useState } from "react";

const SignUpEmail = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (val) => {
    setEmail(val);
  };
  return (
    <div className="signUpEmailWrapper">
      <CustomInput
        floatingLabel="Email address"
        required={true}
        id="email"
        type="email"
        val={email}
        updateState={handleEmailChange}
        className="signUpCustomInput"
        errorMessage="Email is required."
      />
      <button>
        Get Started <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default SignUpEmail;
