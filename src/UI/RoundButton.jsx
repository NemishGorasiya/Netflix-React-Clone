import "./RoundButton.scss";
import PropTypes from "prop-types";

const RoundButton = ({ iconClassName, onClick }) => {
  return (
    <button className="roundBtn" onClick={onClick}>
      <span>
        <i className={iconClassName} />
      </span>
    </button>
  );
};

RoundButton.propTypes = {
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundButton;
