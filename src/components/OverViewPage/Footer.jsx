import SelectLanguage from "./SelectLanguage.jsx";
import "./Footer.scss";
import PropTypes from "prop-types";

const Footer = ({ footerLinks, style }) => {
  return (
    <div className="footerSection" style={style}>
      <p>
        Questions? Call{" "}
        <a href="" className="mobileNo">
          000-800-919-1694
        </a>
      </p>
      <div className="footerLinksContainer">
        {footerLinks.map(({ linkName }) => (
          <a key={linkName} className="footerLink" href="">
            {linkName}
          </a>
        ))}
      </div>
      <SelectLanguage />
    </div>
  );
};

Footer.propTypes = {
  footerLinks: PropTypes.array,
  style: PropTypes.object,
};

export default Footer;
