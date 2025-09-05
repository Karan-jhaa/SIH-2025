import React from "react";
import "../Dashboard.css";

const Roadmap = () => {
  return (
    <div className="card">
      <h3>Roadmap</h3>
      <ul className="roadmap">
        <li>
          <span className="phase-icon">📊</span>
          <div>
            <p>Phase 1: Data Collection</p>
            <p className="small-text">Q1 2024</p>
          </div>
        </li>
        <li>
          <span className="phase-icon">🧠</span>
          <div>
            <p>Phase 2: Model Training</p>
            <p className="small-text">Q2 2024</p>
          </div>
        </li>
        <li>
          <span className="phase-icon">🔬</span>
          <div>
            <p>Phase 3: Evaluation</p>
            <p className="small-text">Q3 2024</p>
          </div>
        </li>
        <li>
          <span className="phase-icon">🚀</span>
          <div>
            <p>Phase 4: Deployment</p>
            <p className="small-text">Q4 2024</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
