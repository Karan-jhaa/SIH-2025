import React from "react";
import "../Dashboard.css";

const Roadmap = ({ items = [] }) => {
  return (
    <div className="card">
      <h3>Roadmap</h3>
      <ul className="roadmap">
        {items.map((it, i) => (
          <li key={i}>
            <span className="phase-icon">{it.icon}</span>
            <div>
              <p>{it.title}</p>
              <p className="small-text">{it.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
