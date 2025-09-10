import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaRobot, FaEnvelope } from "react-icons/fa"; 
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>MyApp</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <FaHome className="icon" />
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/Discover">
            <FaSearch className="icon" />
            <span className="link-text">Discover</span>
          </Link>
        </li>
        <li>
          <Link to="/SmartAssistant">
            <FaRobot className="icon" />
            <span className="link-text">Smart Assistant</span>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <FaEnvelope className="icon" />
            <span className="link-text">Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
