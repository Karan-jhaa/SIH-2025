import React from "react";
import "../Dashboard.css";

const ModelPerformance = () => {
  return (
    <div className="card">
      <h3>Model Performance</h3>
      <p className="big-text">85%</p>
      <div className="sub-info">
        <p>Last 30 Days</p>
        <p className="positive">+5%</p>
      </div>
      <div className="bar-chart">
        <div className="bar" style={{ height: "70%" }}></div>
        <div className="bar" style={{ height: "90%" }}></div>
        <div className="bar" style={{ height: "80%" }}></div>
      </div>
    </div>
  );
};

export default ModelPerformance;
