import React from "react";
import "../Dashboard.css";

const ModelPerformance = ({ data }) => {
  if (!data) return null;

  const scorePercent = Math.round((data.score ?? 0) * 100);

  return (
    <div className="card">
      <h3>Model Performance</h3>
      <p className="big-text">{scorePercent}%</p>
      <div className="sub-info">
        <p>{data.period}</p>
        <p className={data.change >= 0 ? "positive" : "negative"}>
          {data.change >= 0 ? "+" : ""}
          {Math.round(data.change * 100)}%
        </p>
      </div>
      <div className="bar-chart">
        {(data.bars || []).map((b, i) => (
          <div key={i} className="bar" style={{ height: `${Math.round((b ?? 0) * 100)}%` }}></div>
        ))}
      </div>
    </div>
  );
};

export default ModelPerformance;
