import React, { useState } from "react";
import '../App.css';
import { Link } from "react-router-dom"; 

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="dashboard ">
      <div className="topBox">
        <div className="content">
          <button>Profile</button>
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
