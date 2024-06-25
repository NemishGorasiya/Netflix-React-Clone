import SignUpEmail from "./SignUpEmail.jsx";
import "./SignUpEmailSection.scss";

const SignUpEmailSection = () => {
  return (
    <div className="signUpEmailSection">
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <SignUpEmail />
    </div>
  );
};

export default SignUpEmailSection;
