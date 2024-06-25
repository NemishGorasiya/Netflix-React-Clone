import HomePageNavBar from "../components/HomePage/HomePageNavBar";
import "./ErrorPage.scss";
import errorImage from "../assets/errorImage.png";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <HomePageNavBar />
      <div className="errorPageContent">
        <img src={errorImage} alt="Page not found image" />
      </div>
    </div>
  );
};

export default ErrorPage;
