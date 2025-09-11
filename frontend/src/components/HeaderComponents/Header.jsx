// import { Button } from "@/components/ui/button";
import { Users, Building } from "lucide-react";
import "./Header.css"; // Import external CSS

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
          <a href="#">Dashboard</a>
          <a href="#">Opportunities</a>
          <a href="#">Candidates</a>
          <a href="#">Reports</a>
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
