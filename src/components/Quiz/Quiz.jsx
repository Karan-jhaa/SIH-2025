import React, { useState } from "react";
import axios from "axios";
import "./Quiz.css";
import QuestionCard from "./Quiz-component/QuestionCard";
import Pagination from "./Quiz-component/Pagination";
import SubmitButton from "./Quiz-component/SubmitButton";

const questions = [
  "Working outdoors is more enjoyable than working in an office.",
  "Taking apart machines, engines, or gadgets to see how they work is enjoyable.",
  "Operating, driving, or controlling machines is something I enjoy.",
  "Learning by doing is better than learning by reading instructions.",
  "Solving math or science problems is enjoyable.",
  "Researching and analyzing data is interesting to me.",
  "Discovering how and why things work is satisfying.",
  "Experiments with uncertain outcomes are exciting and interesting.",
  "Expressing myself through art, music, or writing is enjoyable.",
  "Finding unique solutions that others may not think of comes naturally to me.",
  "Open-ended projects with no single “right” answer are appealing.",
  "Jobs that value imagination and innovation are motivating.",
  "Working in teams is better than working alone.",
  "Jobs where communication and empathy matter are rewarding.",
  "Listening to people and giving advice is enjoyable.",
  "Leading group discussions or workshops is something I like.",
  "Setting goals and motivating myself (and others) to achieve them is satisfying.",
  "Challenges that require decision-making are motivating.",
  "Convincing others to support ideas or projects is enjoyable.",
  "Fast-paced and competitive environments are exciting.",
  "Accuracy and attention to detail are important in my work.",
  "Following step-by-step instructions is enjoyable.",
  "Keeping my workspace neat and organized is satisfying.",
  "Checking work for errors or inconsistencies is satisfying."
];

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const [answers, setAnswers] = useState([]);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const handleRating = (questionIndex, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = {
        question: questions[questionIndex],
        answer: value
      };
      return updated;
    });
  };

  const handleSubmit = async () => {
    // check missing answers
    const unanswered = questions.filter((_, index) => !answers[index]?.answer);
  
    if (unanswered.length > 0) {
      alert("Please answer all questions before submitting!");
      return; // stop submission
    }
  
    try {
      const response = await axios.post("http://localhost:5000/quiz", { answers });
      console.log("Backend Response:", response.data);
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error sending answers:", error);
      alert("Error while submitting answers!");
    }
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
              <QuestionCard
                key={questionIndex}
                index={questionIndex}
                question={q}
                selected={answers[questionIndex]?.answer}
                onRate={handleRating}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {currentPage === totalPages && <SubmitButton onSubmit={handleSubmit} />}
      </main>
    </>
  );
};

export default Quiz;
