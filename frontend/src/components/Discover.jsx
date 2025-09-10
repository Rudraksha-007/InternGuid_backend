import React, { useState } from "react";
import "../App.css";
import Navbar from "./Navbar";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [location, setLocation] = useState("");

  const internships = [
    {
      id: 1,
      title: "Product Management Intern",
      company: "TechCorp",
      type: "Remote",
      duration: "3 months",
      stipend: "₹10,000 /month",
      location: "Bangalore",
      details: "Assist in product roadmap, user research, and feature planning."
    },
    {
      id: 2,
      title: "Associate PM Intern",
      company: "InnovateX",
      type: "On-site",
      duration: "6 months",
      stipend: "₹15,000 /month",
      location: "Delhi",
      details: "Work with cross-functional teams and learn agile practices."
    },
    {
      id: 3,
      title: "Product Strategy Intern",
      company: "StartupHub",
      type: "Remote",
      duration: "2 months",
      stipend: "Unpaid",
      location: "Remote",
      details: "Support market research and competitor analysis."
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(search.toLowerCase()) ||
                          internship.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || internship.type === filterType;
    const matchesLocation = !location || internship.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="discover-container">
        <Navbar/>
      {/* 🔍 Search & Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search internships..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Internship Cards */}
      <div className="internship-list">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Type:</strong> {internship.type}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Stipend:</strong> {internship.stipend}</p>
              <p><strong>Location:</strong> {internship.location}</p>
              <p className="details">{internship.details}</p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))
        ) : (
          <p className="no-results">No internships found 🚫</p>
        )}
      </div>
    </div>
  );
};

export default Discover;
