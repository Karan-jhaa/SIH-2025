// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Header from "./Dashboard-component/Header";
import "./Dashboard.css";
import axios from "axios";
import { getAuthValue, isSignedIn, clearAuth } from "/src/auth"; // adjust path if needed


const user_id = getAuthValue("user_id");
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        setError("Not logged in");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const resp = await axios.get(`http://localhost:3000/api/dashboard?user_id=${user_id}`);
        setPayload(resp.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err.response?.data || err.message);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="dashboard"><Header /><div className="dashboard-loading">Loading dashboard...</div></div>;
  if (error) return <div className="dashboard"><Header /><div className="dashboard-loading">{error}</div></div>;

  const { user, riasec, ml_response } = payload || {};
  const userName = localStorage.getItem("userName") || (user && (user.first_name || user.username)) || "User";

  // ml_response could be structured in many ways; adapt here:
  // determine recommendations safely
  let recommendations = [];
  if (ml_response) {
    if (typeof ml_response === "string") {
      try {
        const parsed = JSON.parse(ml_response);
        recommendations = parsed.recommendations || parsed.results || [];
      } catch (e) {
        recommendations = [];
      }
    } else if (ml_response.recommendations || ml_response.results) {
      recommendations = ml_response.recommendations || ml_response.results;
    } else {
      recommendations = Array.isArray(ml_response) ? ml_response : [];
    }
  }

  const perf = ml_response?.performance || null;
  // try image from ML response, else local asset (place src/assets/graph.png)
  const graphSrc = (ml_response && (ml_response.graph_url || ml_response.image_url)) || "/src/assets/graph.png";

  return (
    <div className="dashboard">
      <Header />

      <main className="dashboard-card-wrapper">
        <div className="dashboard-card">

          {/* LEFT COLUMN */}
          <div className="left-column">
            <div className="greeting">
              <h2>Hello, <span className="username">{userName}</span></h2>
              <p className="small">Welcome back — here are your personalized results.</p>
            </div>

            <div className="graph-box">
              {/* If image exists, show it; otherwise show a placeholder */}
              <img
                src={graphSrc}
                alt="Model performance"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="graph-image"
              />

              {!graphSrc && (
                <div className="graph-placeholder">Graph will appear here</div>
              )}

              {perf && (
                <div className="graph-caption">
                  <div>Score: <strong>{Math.round((perf.score ?? 0) * 100)}%</strong></div>
                  <div className="small">{perf.period || ""}</div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <div className="ml-response-card">
              <h3>Model Recommendations</h3>
              {Array.isArray(recommendations) && recommendations.length > 0 ? (
                <ul className="recommendation-list">
                  {recommendations.map((r, idx) => (
                    <li key={idx} className="rec-item">
                      <div className="rec-left">
                        <div className="rec-index">{idx + 1}</div>
                      </div>

                      <div className="rec-right">
                        <div className="rec-title">{r.title || r.feature || r.job || r.name || JSON.stringify(r)}</div>
                        {r.description && <div className="rec-desc">{r.description}</div>}
                        {r.score !== undefined && <div className="rec-meta">Score: {r.score}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-recs">No recommendations available yet. Take the quiz to generate results.</div>
              )}
            </div>

            {/* optionally show raw ML JSON below */}
            {ml_response && (
              <div className="ml-raw">
                <h4>Raw ML Response</h4>
                <pre className="ml-json">{JSON.stringify(ml_response, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
