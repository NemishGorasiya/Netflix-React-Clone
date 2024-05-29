import PropTypes from "prop-types";
import SelectLanguage from "./SelectLanguage.jsx";
import "./Footer.scss";

const Footer = ({ footerLinks }) => {
  return (
    <div className="footerSection">
      <p>
        Questions? Call{" "}
        <a
          href="tel:0008009191694"
          aria-describedby="telephone 0008009191694"
          className="mobileNo"
        >
          000-800-919-1694
        </a>
      </p>
      <div className="footerLinksContainer">
        {footerLinks.map(({ linkName }, index) => (
          <a key={index} aria-describedby={linkName} className="footerLink">
            {linkName}
          </a>
        ))}
      </div>
      <SelectLanguage />
    </div>
  );
};

Footer.propTypes = {
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      linkName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
