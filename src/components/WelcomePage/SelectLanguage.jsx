import "./SelectLanguage.scss";

import { supportedLanguages } from "../../data/data.jsx";

const SelectLanguage = () => {
  return (
    <div className="selectLanguage">
      <select>
        {supportedLanguages.map(({ value, label }) => (
          <option key={value} value="value">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;