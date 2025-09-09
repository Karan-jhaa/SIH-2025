import React from "react";
import "../Dashboard.css";

const ModelResults = ({ data }) => {
  if (!Array.isArray(data)) return null;

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
          {data.map((r, idx) => (
            <tr key={idx}>
              <td>{r.feature}</td>
              <td>{r.importance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelResults;
