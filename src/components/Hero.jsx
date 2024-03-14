import HeroContent from "./HeroContent";
import HeroCurve from "./HeroCurve";
import NavBar from "./NavBar";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <NavBar />
      <HeroContent />
      <HeroCurve />
    </div>
  );
};

export default Hero;
