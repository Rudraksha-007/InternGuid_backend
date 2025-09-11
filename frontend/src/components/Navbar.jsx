import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaRobot } from "react-icons/fa";

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
          <Link to="/Dashboard2">
            <FaRobot className="icon" />
            <span className="link-text">Dashboard</span>
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
            <span className="link-text">Assistant</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
