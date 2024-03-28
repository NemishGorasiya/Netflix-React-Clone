import "./MoreDetails.scss";
import MoreReasonSection from "./MoreReasonSection.jsx";
import Plans from "./Plans.jsx";
import FAQsSection from "./FAQsSection.jsx";
import SignUpEmailSection from "./SignUpEmailSection.jsx";
import Footer from "./Footer.jsx";
import CopyRightSection from "./CopyRightSection.jsx";
import { footerLinks } from "../../data/data.js";

export default function MoreDetails() {
  return (
    <div className="moreDetails">
      <div className="heroPageSections">
        <Plans />
        <MoreReasonSection />
        <FAQsSection />
        <SignUpEmailSection />
        <Footer footerLinks={footerLinks} />
        <CopyRightSection />
      </div>
    </div>
  );
}
