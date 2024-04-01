import "./SignupEmail.scss";
import { chevronRightSVG } from "../../data/data.js";
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
        floatingLabel="Email Address"
        required={true}
        id="email"
        type="email"
        val={email}
        updateState={handleEmailChange}
        style={{ flex: "1" }}
      />
      <button>
        Get Started{" "}
        <span dangerouslySetInnerHTML={{ __html: chevronRightSVG }}></span>
      </button>
    </div>
  );
};

export default SignupEmail;
