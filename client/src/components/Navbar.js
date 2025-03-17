import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTools, FaStar, FaEnvelope } from "react-icons/fa"; // Mechanic-themed icons
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src="/images/logo.png" alt="Mac's Shop Logo" className="logo-img" /> {/* Logo image */}
        Mac's Shop
      </h2><br></br>
      <ul>
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
    </nav>
  );
};

export default Navbar;