import "./RoundButton.scss";
const RoundButton = ({ iconClassName, handleMuteVolumeClick }) => {
  return (
    <button className="roundBtn" onClick={handleMuteVolumeClick}>
      <span>
        <i className={iconClassName} />
      </span>
    </button>
  );
};

export default RoundButton;
