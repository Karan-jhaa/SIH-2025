import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from '/src/assets/Logo.png'
import { getAuthValue, isSignedIn, clearAuth } from "/src/auth"; // adjust path if needed


const Header = () => {
  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [userName, setUserName] = useState(getAuthValue("userName"));
  useEffect(() => {
  setSignedIn(isSignedIn());
  setUserName(getAuthValue("userName"));
  }, []);
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-icon"/>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/#service">Our Services</a> 
          <a href="/contact">Contact Us</a>
        </nav>

<div className="auth-buttons">
  {signedIn ? (
    <>
      <a href="/dashboard" className="profile-link" title={userName}>
        <div className="profile-circle" aria-hidden="true">
          { (userName || "U").split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase() }
        </div>
      </a>
      <button
        onClick={() => {
          clearAuth();
          // refresh header UI and go to home
          setSignedIn(false);
          window.location.href = "/";
        }}
        className="logout-btn"
        style={{ marginLeft: 8 }}
      >
        Logout
      </button>
    </>
  ) : (
    <a href="/login" className="login-btn">Login</a>
  )}
</div>
      </div>
    </header>
  );
};

export default Header;
