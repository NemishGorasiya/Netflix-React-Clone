import "./SignupEmail.scss";
import { chevronRightSVG } from "../data/data.js";

const SignupEmail = () => {
  return (
    <div className="signupEmailWrapper">
      <input type="email" className="signUpEmail" placeholder="Email address" />
      <button>
        Get Started{" "}
        <span dangerouslySetInnerHTML={{ __html: chevronRightSVG }}></span>
      </button>
    </div>
  );
};

export default SignupEmail;
