import "./Loader.scss";
import PropTypes from "prop-types";

const Loader = ({ atCenter = false }) => (
  <div className={`loader ${atCenter && "atCenter"}`} />
);

Loader.propTypes = {
  atCenter: PropTypes.bool,
};

export default Loader;
