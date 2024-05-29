import PropTypes from "prop-types";
import "./Loader.scss";

const Loader = ({ atCenter }) => (
  <div className={`loader ${atCenter ? "atCenter" : ""}`}></div>
);

Loader.propTypes = {
  atCenter: PropTypes.bool,
};

export default Loader;
