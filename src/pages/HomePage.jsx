import CarouselSlider from "../components/HomePage/CarouselSlider";
import MoviesCategories from "../components/HomePage/MoviesCategories";
import Footer from "../components/WelcomePage/Footer.jsx";
import { footerLinks } from "../constants/constants.js";
import "./HomePage.scss";

const HomePage = () => {
	const path = window.location.pathname;

	const isHomePage = path === "/home";
	const mediaType = isHomePage ? "movie" : path === "/movies" ? "movie" : "tv";

	return (
		<div className="homePage">
			<CarouselSlider mediaType={mediaType} />
			{isHomePage ? (
				<>
					<MoviesCategories mediaType="movie" />
					<MoviesCategories mediaType="tv" />
				</>
			) : (
				<MoviesCategories mediaType={mediaType} />
			)}
			<div className="footerWrapper">
				<Footer footerLinks={footerLinks} />
			</div>
		</div>
	);
};

export default HomePage;
