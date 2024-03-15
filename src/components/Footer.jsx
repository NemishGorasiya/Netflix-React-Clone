import SelectLanguage from "./SelectLanguage.jsx";
import "./Footer.scss";

const Footer = ({ footerLinks }) => {
  return (
    <div className="footerSection">
      <p>
        Questions? Call{" "}
        <a href="" className="mobileNo">
          000-800-919-1694
        </a>
      </p>
      <div className="footerLinksContainer">
        {footerLinks.map((link) => (
          <a key={link.linkName} className="footerLink" href="">
            {link.linkName}
          </a>
        ))}
      </div>
      <SelectLanguage />
    </div>
  );
};

export default Footer;
