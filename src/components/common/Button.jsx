import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ iconClassName = "", text = "", ...props }) => {
  return (
    <button type="button" {...props}>
      {iconClassName && <i className={iconClassName} />} {text}
    </button>
  );
};

Button.propTypes = {
  iconClassName: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
