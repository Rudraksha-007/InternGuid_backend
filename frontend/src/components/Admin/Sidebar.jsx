import React, { useState } from "react";
import "./Admin.css";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`adm-sidebarr ${open ? "open" : ""}`}>
        {/* Brand */}
        <div className="brand">
          <div className="logo">PM</div>
          <div className="brand-text">Admin Dashboard</div>
        </div>

        {/* Nav */}
        <nav className="navi">
          <button className="nav-itemm active">
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button className="nav-itemm">
            <Users size={18} />
            Candidates
          </button>
          <button className="nav-itemm">
            <Briefcase size={18} />
            Internships
          </button>
          <button className="nav-itemm">
            <BarChart3 size={18} />
            Analytics
          </button>
          <button className="nav-itemm">
            <Settings size={18} />
            Settings
          </button>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="avatar">AD</div>
          <div className="admin-meta">
            <div className="name">Admin User</div>
            <div className="email">admin@pminternship.gov.in</div>
          </div>
        </div>
      </aside>
    </>
  );
}
