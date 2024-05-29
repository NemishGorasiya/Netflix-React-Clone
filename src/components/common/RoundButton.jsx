import "./RoundButton.scss";
import PropTypes from "prop-types";

const RoundButton = ({ iconClassName, onClick, title }) => {
  return (
    <button className="roundBtn" title={title} onClick={onClick}>
      <span>
        <i className={iconClassName} />
      </span>
    </button>
  );
};

RoundButton.propTypes = {
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default RoundButton;
