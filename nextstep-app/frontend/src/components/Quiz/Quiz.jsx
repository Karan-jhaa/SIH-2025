import React, { useState } from "react";
import axios from "axios";
import "./Quiz.css";
import QuestionCard from "./Quiz-component/QuestionCard";
import Pagination from "./Quiz-component/Pagination";
import SubmitButton from "./Quiz-component/SubmitButton";
import { getAuthValue } from "/src/auth";

const user_id = getAuthValue("user_id");
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

  const [answers, setAnswers] = useState(Array(24).fill(null));
  const [submitting, setSubmitting] = useState(false);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

// ensure answers are stored as plain integers
const handleRate = (index, value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    console.warn("handleRate called with non-numeric value:", value);
    return;
  }
  setAnswers((prev) => {
    const copy = Array.isArray(prev) ? [...prev] : Array(24).fill(null);
    copy[index] = n;
    return copy;
  });
};


// ensure you have this import at top (adjust path if necessary)


const handleSubmit = async (e) => {
  if (e && e.preventDefault) e.preventDefault();
  console.log("[Quiz] Submitting payload =>", { user_id: getAuthValue("user_id"), answers });

  // check unanswered
  const unanswered = answers.map((v,i)=> (v === null || v === undefined) ? i+1 : null).filter(Boolean);
  if (unanswered.length) {
    alert("Please answer all questions. Missing: " + unanswered.join(", "));
    return;
  }

  // coerce to numbers defensively
  const numericAnswers = answers.map((a, idx) => {
    const n = Number(a);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1 || n > 5) {
      console.warn("Invalid answer found at index", idx, "value:", a);
      // convert to 1 as fallback (or you can abort). Here we'll abort to force user fix:
      throw new Error(`Invalid answer for question ${idx + 1}: ${a}`);
    }
    return n;
  });

  const user_id = getAuthValue("user_id");
  if (!user_id) {
    alert("You must be logged in to submit the quiz.");
    return;
  }

  try {
    const resp = await axios.post("http://localhost:3000/api/submit", { user_id, answers: numericAnswers }, { validateStatus: () => true });
    console.log("[Quiz] HTTP status:", resp.status);
    console.log("[Quiz] Response data:", resp.data);
    if (resp.status >= 200 && resp.status < 300 && resp.data && resp.data.success) {
      window.location.href = "/dashboard";
    } else {
      alert("Submission failed: " + (resp.data?.error || JSON.stringify(resp.data)));
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("Submission error — see console.");
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
              key={questionIndex}            // use global index for stable keys
              index={questionIndex}          // pass global question index
              question={q}
              selected={answers[questionIndex]} // read from global slot
              onRate={handleRate}
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
