import React from "react";
import NavBar from "./NavBar";
import HeroContent from "./HeroContent";
import HeroCurve from "./HeroCurve";
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
