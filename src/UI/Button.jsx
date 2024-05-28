import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ iconClassName = "", text, ...props }) => {
	return (
		<button {...props}>
			{iconClassName && <i className={iconClassName} />} {text}
		</button>
	);
};

Button.propTypes = {
	iconClassName: PropTypes.string,
	text: PropTypes.string.isRequired,
};

export default Button;
