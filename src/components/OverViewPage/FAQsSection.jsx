import { useState } from "react";
import { FAQs } from "../../data/data.js";

const FAQsSection = () => {
  const [openedQuestionIndex, setOpenedQuestionIndex] = useState(-1);
  const handleRevealAnswer = (idx) => {
    setOpenedQuestionIndex((prevOpenedQuestionIndex) => {
      if (idx === prevOpenedQuestionIndex) {
        return -1;
      } else {
        return idx;
      }
    });
  };

  return (
    <div className="FAQsSection" id="FAQsSection">
      <h3 className="sectionHeading">Frequently Asked Questions</h3>
      <div className="FAQsContainer">
        {FAQs.map((question, idx) => (
          <div key={idx} className="questionContainer">
            <div
              className="questionWrapper"
              onClick={() => {
                handleRevealAnswer(idx);
              }}
            >
              <div className="question">{question.question}</div>
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
              dangerouslySetInnerHTML={{ __html: question.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
