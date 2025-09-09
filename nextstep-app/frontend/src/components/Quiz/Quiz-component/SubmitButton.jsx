import React from "react";
import "../Quiz.css";

const SubmitButton = ({ onSubmit }) => {
  return (
    <div className="submit-section">
      <button className="submit-btn" onClick={onSubmit}>
        Submit Answers
      </button>
    </div>
  );
};

export default SubmitButton;
