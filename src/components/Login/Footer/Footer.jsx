import React from "react";
import "./Footer.css";

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Help</a>
        <a href="#about">About Us</a>
        <a href="#">Privacy Policy</a>
      </div>
      <p>© {date} NextStep. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
