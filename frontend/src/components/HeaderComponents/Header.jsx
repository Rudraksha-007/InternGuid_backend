// import { Button } from "@/components/ui/button";
import { Users, Building } from "lucide-react";
import "./Header.css"; // Import external CSS
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-box">
            <Building className="logo-icon" />
          </div>
          <div>
            <h1 className="title">PM Internship Scheme</h1>
            <p className="subtitle">Smart Matching System</p>
          </div>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/Dashboard">Dashboard</Link>
          <Link to="/Discover">Discover</Link>
          <Link to="/SmartAssistant">AI</Link>
        </nav>

        <div className="header-right">
          <button className="profile-btn">
            <Users className="btn-icon" />
              Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
