import "./Button.scss";

const Button = ({ className, iconClassName, text, style, onClick }) => {
  return (
    <button style={style} className={className} onClick={onClick}>
      <i className={iconClassName} /> {text}
    </button>
  );
};

export default Button;
