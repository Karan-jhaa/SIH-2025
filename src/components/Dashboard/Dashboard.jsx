import React from "react";
import Header from "./Dashboard-component/Header";
import ModelPerformance from "./Dashboard-component/ModelPerformance";
import ModelResults from "./Dashboard-component/ModelResult";
import Roadmap from "./Dashboard-component/Roadmap";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-content">
        <ModelPerformance />
        <ModelResults />
        <Roadmap />
      </main>
    </div>
  );
};

export default Dashboard;
