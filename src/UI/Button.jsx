import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ iconClassName, text, ...props }) => {
  return (
    <button {...props}>
      <i className={iconClassName} /> {text}
    </button>
  );
};

Button.propTypes = {
  iconClassName: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
