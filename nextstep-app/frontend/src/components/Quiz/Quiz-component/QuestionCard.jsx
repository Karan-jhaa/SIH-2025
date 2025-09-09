import React from "react";
import "../Quiz.css";

const QuestionCard = ({ index, question, selected, onRate }) => {
  return (
    <div className="question-card fade-in">
      <p className="question-text">
        {index + 1}. {question}
      </p>
      <div className="rating-container">
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              className={`rating-bullet ${selected === val ? "selected" : ""}`}
              onClick={() => onRate(index, val)}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
