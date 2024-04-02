import "./SignupEmail.scss";
import CustomInput from "../../UI/CustomInput.jsx";
import { useState } from "react";

const SignupEmail = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (val) => {
    setEmail(val);
  };
  return (
    <div className="signupEmailWrapper">
      <CustomInput
        floatingLabel="Email address"
        required={true}
        id="email"
        type="email"
        val={email}
        updateState={handleEmailChange}
        style={{ flex: "1", height: "56px" }}
        errorMessage="Email is required."
      />
      <button>
        Get Started <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default SignupEmail;
