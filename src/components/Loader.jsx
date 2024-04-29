import "./Loader.scss";
import PropTypes from "prop-types";

const Loader = ({ atCenter }) => (
  <div className={`loader ${atCenter ? "atCenter" : ""}`}></div>
);

Loader.propTypes = {
  atCenter: PropTypes.bool,
};

export default Loader;
