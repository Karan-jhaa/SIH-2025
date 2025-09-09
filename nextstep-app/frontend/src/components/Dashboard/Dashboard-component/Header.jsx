import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import Logo from '/src/assets/Logo.jpeg';
import axios from "axios";

const Header = () => {
  const token = localStorage.getItem("authToken") || localStorage.getItem("user_id");
  const storedUserId = localStorage.getItem("user_id");
  const storedUserName = localStorage.getItem("userName"); // you may set this on login

  const [userName, setUserName] = useState(storedUserName || "");

  useEffect(() => {
    // If userName not in localStorage, fetch it using user_id
    const fetchUser = async () => {
      if (!userName && storedUserId) {
        try {
          const resp = await axios.get(`http://localhost:3000/api/me?user_id=${storedUserId}`);
          const user = resp.data.user;
          const fullName = [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ") || user.username;
          setUserName(fullName);
          localStorage.setItem("userName", fullName);
        } catch (err) {
          console.error("Failed to fetch user for header:", err);
        }
      }
    };
    fetchUser();
  }, [storedUserId, userName]);

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
          <img src={Logo} alt="logo" className="logo-img" />
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/#service">Our Services</a>
          <a href="/contact">Contact Us</a>
        </nav>

          <div className="auth-buttons">
            {token ? (
              <a href="/dashboard" className="profile-link" title={userName}>
                <div className="profile-circle">{getInitials(userName)}</div>
              </a>
            ) : (
              <a href="/login" className="login-btn">Login</a>
            )}

          <button className="menu-btn" aria-label="menu">
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
