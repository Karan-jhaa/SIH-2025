import React from "react";
import "../Dashboard.css";
import Logo from '/src/assets/Logo.jpeg';

const Header = () => {
  const token = localStorage.getItem("authToken"); 
  const userName = localStorage.getItem("userName"); // backend se set karna hoga
  
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const initials = parts.map((p) => p[0].toUpperCase());
    return initials.join("");
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/#service">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className="auth-buttons">
          {token ? (
            <div className="profile-circle">
              {getInitials(userName)}
            </div>
          ) : (
            <a href="/login" className="login-btn">Login</a>
          )}
          
          <button className="menu-btn">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
