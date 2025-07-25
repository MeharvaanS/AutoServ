import React from "react";
import { FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <small>&copy; {new Date().getFullYear()} Mac Auto Company. All rights reserved.</small>
      </div>
      <div className="footer-right">
        <a
          href="https://www.instagram.com/mac.auto.company?igsh=eHI5YTI0eWJ0bDR4"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:mac.mechanic.express@gmail.com"
          className="footer-icon"
        >
          <FaEnvelope />
        </a>
        <a
          href="tel:(416) 276-2096"
          className="footer-icon"
        >
          <FaPhone />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
