import React from "react";
import "../Dashboard.css";

const ModelResults = () => {
  return (
    <div className="card">
      <h3>ML Model Results</h3>
      <table className="results-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Feature A</td><td>0.25</td></tr>
          <tr><td>Feature B</td><td>0.20</td></tr>
          <tr><td>Feature C</td><td>0.15</td></tr>
          <tr><td>Feature D</td><td>0.10</td></tr>
          <tr><td>Feature E</td><td>0.05</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModelResults;
