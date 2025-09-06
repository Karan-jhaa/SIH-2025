import React from "react";
import "./Header.css";
import Logo from '/src/assets/Logo_1.png'

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo-container">
          <div className="logo"></div>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/#service">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className="auth-buttons">
          <a href="/login" className="login-btn">Login</a>
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
