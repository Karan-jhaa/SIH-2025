// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Pehle alert
    window.alert("Please login or Register to access this page.");

    // Uske baad turant redirect
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
