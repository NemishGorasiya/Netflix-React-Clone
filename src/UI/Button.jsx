import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ className, iconClassName, text, style, onClick }) => {
  return (
    <button style={style} className={className} onClick={onClick}>
      <i className={iconClassName} /> {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
