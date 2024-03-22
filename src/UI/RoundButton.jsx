import "./RoundButton.scss";
const RoundButton = ({ iconClassName, onClick }) => {
  return (
    <button className="roundBtn" onClick={onClick}>
      <span>
        <i className={iconClassName} />
      </span>
    </button>
  );
};

export default RoundButton;
