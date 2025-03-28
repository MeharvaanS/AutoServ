import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTools, FaStar, FaEnvelope, FaBars } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const show = window.scrollY > 10;
        if (show) {
          navbarRef.current.classList.add('scrolled');
        } else {
          navbarRef.current.classList.remove('scrolled');
        }
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}></div>
      
      <nav ref={navbarRef} className="navbar">
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
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
              <FaHome className="iconnav" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>
              <FaTools className="iconnav" /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className={({ isActive }) => isActive ? "active" : ""}>
              <FaStar className="iconnav" /> Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
              <FaEnvelope className="iconnav" /> Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
              <FaInfoCircle className="iconnav" /> About
            </NavLink>
          </li>
        </ul>
        
        {/* Mobile Navigation */}
        <div className={`nav-links-container ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links mobile-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMobileMenu}>
                <FaHome className="iconnav" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMobileMenu}>
                <FaTools className="iconnav" /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMobileMenu}>
                <FaStar className="iconnav" /> Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMobileMenu}>
                <FaEnvelope className="iconnav" /> Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMobileMenu}>
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