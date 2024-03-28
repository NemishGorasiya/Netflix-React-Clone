import SignupEmail from "./SignupEmail";

const HeroContent = () => {
  return (
    <div className="heroContent">
      <h1>Unlimited movies, TV shows and more</h1>
      <h4>
        Starts at &#8377; <span>149</span>. Cancel anytime.
      </h4>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <SignupEmail />
    </div>
  );
};

export default HeroContent;
