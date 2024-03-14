import "./SignupEmail.scss";
const SignupEmail = () => {
  return (
    <div className="signupEmailWrapper">
      <input type="email" className="signUpEmail" placeholder="Email address" />
      <button>Get Started &gt; </button>
    </div>
  );
};

export default SignupEmail;
