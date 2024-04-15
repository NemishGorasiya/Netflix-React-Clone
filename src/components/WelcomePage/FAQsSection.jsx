import { useState } from "react";
import { FAQs } from "../../constants/constants.js";
import "./FAQsSection.scss";

const FAQsSection = () => {
  const [openedQuestionIndex, setOpenedQuestionIndex] = useState(-1);
  const handleRevealAnswer = (idx) => {
    setOpenedQuestionIndex((prevOpenedQuestionIndex) => {
      return idx === prevOpenedQuestionIndex ? -1 : idx;
    });
  };

  return (
    <div className="FAQsSection" id="FAQsSection">
      <h3 className="sectionHeading">Frequently Asked Questions</h3>
      <div className="FAQsContainer">
        {FAQs.map(({ question, answer }, idx) => (
          <div key={idx} className="questionContainer">
            <div
              className="questionWrapper"
              onClick={() => {
                handleRevealAnswer(idx);
              }}
            >
              <div className="question">{question}</div>
              <span
                className={
                  idx === openedQuestionIndex ? "plusBtn opened" : "plusBtn"
                }
              >
                +
              </span>
            </div>
            <div
              className={
                idx === openedQuestionIndex ? "answer opened" : "answer"
              }
              dangerouslySetInnerHTML={{ __html: answer }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
