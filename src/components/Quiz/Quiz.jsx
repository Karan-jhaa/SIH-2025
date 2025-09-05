import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Quiz.css";

const questions = [
  "Would you like working outdoors rather than in an office.",
  "Do you enjoy building or assembling physical objects?",
  "Would you like a job that involves driving, operating, or controlling machines?",
  "Do you prefer learning by doing rather than reading instructions?",
  "Do you enjoy solving math or science problems?",
  "Would you like a job that involves researching or analyzing data?",
  "Do you like learning how and why things work?",
  "Do you prefer logic and facts over opinions when making decisions?",
  "Do you prefer unstructured tasks where you can be original?",
  "Do you enjoy brainstorming new ideas without strict rules?",
  "Do you prefer open-ended projects where there isn’t one “right” answer?",
  "Would you like a job that values innovation and imagination?",
  "Do you prefer working in teams over working alone?",
  "Would you like a job where communication and empathy are important?",
  "Do you enjoy listening and giving advice to others?",
  "Do you enjoy leading group discussions or workshops?",
  "Do you enjoy convincing others to see your point of view?",
  "Would you like a job where you make business decisions?",
  "Do you enjoy taking risks for potential rewards?",
  "Do you prefer fast-paced, competitive environments?",
  "Do you enjoy organizing files, records, or data?",
  "Would you like a job where accuracy and attention to detail matter?",
  "Do you enjoy working with numbers, charts, or spreadsheets?",
  "Do you enjoy checking work for errors or inconsistencies?"
];

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Store answers: index = questionIndex, value = rating
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  // Handle rating select
  const handleRating = (questionIndex, value) => {
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  };

  // Calculate averages per page on submit
  const handleSubmit = () => {
    const averages = [];
    for (let page = 0; page < totalPages; page++) {
      const sIndex = page * questionsPerPage;
      const eIndex = sIndex + questionsPerPage;
      const pageAnswers = answers.slice(sIndex, eIndex).filter((a) => a !== null);
      if (pageAnswers.length > 0) {
        const avg =
          pageAnswers.reduce((acc, val) => acc + val, 0) / pageAnswers.length;
        averages.push(avg.toFixed(2)); // 2 decimal
      } else {
        averages.push(null); // agar user ne skip kar diya
      }
    }
    console.log("Per-page averages:", averages);
  };

  return (
    <>
      <header className="quiz-header">
        <div className="overlay"></div>
        <h1 className="quiz-title">Know yourself better</h1>
      </header>

      <main className="main-container">
        <div className="questions">
          {currentQuestions.map((q, i) => {
            const questionIndex = startIndex + i;
            return (
              <motion.div
                key={questionIndex}
                className="question-card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="question-text">
                  {questionIndex + 1}. {q}
                </p>
                <div className="rating-container">
                  <div className="rating-options">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        className={`rating-bullet ${
                          answers[questionIndex] === val ? "selected" : ""
                        }`}
                        onClick={() => handleRating(questionIndex, val)}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination buttons */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        {/* Submit button only on last page */}
        {currentPage === totalPages && (
          <div className="submit-section">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Answers
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Quiz;

