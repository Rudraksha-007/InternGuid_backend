import React, { useState } from "react";
import '../App.css';
import { Link } from "react-router-dom"; 
import Navbar from "./Navbar";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    
    <div className="dashboard ">
      <Navbar/>
      <div className="topBox">
        <div className="content">
          <button>
            <Link to="/Profile">Profile</Link></button>
        <button>
          <Link to="/Login">Login</Link>
          </button>
        </div>
        
      </div>
      {/* <div className="search-wrapper">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>
      </div> */}
    </div>
  );
};

export default Dashboard;
