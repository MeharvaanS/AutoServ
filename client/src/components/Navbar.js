import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTools, FaStar, FaEnvelope, FaBars } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}></div>
      
      <nav className="navbar">
        <div className="navbar-header">
          <div className="logo-wrapper">
            <h2 className="logo">
              <img src="/images/logo.png" alt="Mac's Shop Logo" className="logo-img" />
              Mac's Shop
            </h2>
          </div>
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <FaBars className="icon" />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-links">
          <li>
            <NavLink to="/" exact activeClassName="active">
              <FaHome className="iconnav" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" activeClassName="active">
              <FaTools className="iconnav" /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" activeClassName="active">
              <FaStar className="iconnav" /> Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              <FaEnvelope className="iconnav" /> Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              <FaInfoCircle className="iconnav" /> About
            </NavLink>
          </li>
        </ul>
        
        {/* Mobile Navigation */}
        <div className={`nav-links-container ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links mobile-links">
            <li>
              <NavLink to="/" exact activeClassName="active" onClick={toggleMobileMenu}>
                <FaHome className="iconnav" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" activeClassName="active" onClick={toggleMobileMenu}>
                <FaTools className="iconnav" /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" activeClassName="active" onClick={toggleMobileMenu}>
                <FaStar className="iconnav" /> Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active" onClick={toggleMobileMenu}>
                <FaEnvelope className="iconnav" /> Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active" onClick={toggleMobileMenu}>
                <FaInfoCircle className="iconnav" /> About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;