import "./Button.scss";

const Button = ({ className, iconClassName, text, style }) => {
  return (
    <button style={style} className={className}>
      <i className={iconClassName} /> {text}
    </button>
  );
};

export default Button;
