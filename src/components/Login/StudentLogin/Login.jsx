import React from "react";
import "./Login.css";
import LoginLeft from "./StudentLogin-component/LoginLeft";
import LoginRight from "./StudentLogin-component/LoginRight";

export default function StudentLogin() {
  return (
    <div className="login-page">
      <LoginLeft />
      <LoginRight />
    </div>
  );
}
