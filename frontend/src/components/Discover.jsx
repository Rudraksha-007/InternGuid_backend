import React, { useState } from "react";
import "../App.css";
import Navbar from "./Navbar";
import { CiSearch } from "react-icons/ci";
import { MdLocationOn, MdWorkOutline } from "react-icons/md";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [location, setLocation] = useState("");

  // Sample internships (with skill match percentage from backend)
  const internships = [
    {
      id: 1,
      title: "Product Management Intern",
      company: "TechCorp",
      type: "Remote",
      duration: "3 months",
      location: "Bangalore",
      details: "Assist in product roadmap, user research, and feature planning.",
      matchPercentage: 85, // 👈 Data from backend
    },
    {
      id: 2,
      title: "Associate PM Intern",
      company: "InnovateX",
      type: "On-site",
      duration: "6 months",
      location: "Delhi",
      details: "Work with cross-functional teams and learn agile practices.",
      matchPercentage: 60,
    },
    {
      id: 3,
      title: "Product Strategy Intern",
      company: "StartupHub",
      type: "Remote",
      duration: "2 months",
      stipend: "Unpaid",
      location: "Remote",
      details: "Support market research and competitor analysis.",
      matchPercentage: 40,
    },
  ];

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(search.toLowerCase()) ||
      internship.company.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      filterType === "All" || internship.type === filterType;
    const matchesLocation =
      !location ||
      internship.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="discover-container">
      <Navbar />
      {/* 🔍 Search & Filters */}
      <div className="filters">
        {/* Search Bar */}
        <div className="input-icon">
          <CiSearch className="icon" />
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div className="input-icon">
          <MdWorkOutline className="icon" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="input-icon">
          <MdLocationOn className="icon" />
          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
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
              <p><strong>Location:</strong> {internship.location}</p>
              <p className="details">{internship.details}</p>

              {/* 🔹 Skill Match Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${internship.matchPercentage}%` }}
                ></div>
              </div>
              <p className="match-text">
                Skills Match: {internship.matchPercentage}%
              </p>

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






// import React, { useState, useEffect } from "react";
// import "../App.css";
// import Navbar from "./Navbar";
// import { CiSearch } from "react-icons/ci";
// import { MdLocationOn, MdWorkOutline } from "react-icons/md";

// // Function to normalize backend score to percentage (0–100%)
// const normalizeScore = (score, maxScore = 2) => {
//   return Math.min(100, Math.round((score / maxScore) * 100));
// };

// const Discover = () => {
//   const [search, setSearch] = useState("");
//   const [filterType, setFilterType] = useState("All");
//   const [location, setLocation] = useState("");
//   const [internships, setInternships] = useState([]);

//   // 🔹 Fetch from backend (replace URL with your API endpoint)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/internships"); // example endpoint
//         const data = await response.json();

//         // Map backend data to frontend format
//         const formattedData = data.map((item, index) => ({
//           id: index + 1,
//           title: item.title,
//           company: item.domain || "Unknown", // no company in backend? use domain
//           type: "Remote / On-site", // placeholder if backend doesn’t provide
//           duration: "Not Specified", // placeholder
//           stipend: "N/A", // placeholder
//           location: item.location,
//           details: `Skills required: ${item.skills}`,
//           matchPercentage: normalizeScore(item.final_score), // convert score to %
//         }));

//         setInternships(formattedData);
//       } catch (error) {
//         console.error("Error fetching internships:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 Filters
//   const filteredInternships = internships.filter((internship) => {
//     const matchesSearch =
//       internship.title.toLowerCase().includes(search.toLowerCase()) ||
//       internship.company.toLowerCase().includes(search.toLowerCase());
//     const matchesType =
//       filterType === "All" || internship.type === filterType;
//     const matchesLocation =
//       !location ||
//       internship.location.toLowerCase().includes(location.toLowerCase());
//     return matchesSearch && matchesType && matchesLocation;
//   });

//   return (
//     <div className="discover-container">
//       <Navbar />

//       {/* 🔍 Search & Filters */}
//       <div className="filters">
//         {/* Search Bar */}
//         <div className="input-icon">
//           <CiSearch className="icon" />
//           <input
//             type="text"
//             placeholder="Search internships..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Type Filter */}
//         <div className="input-icon">
//           <MdWorkOutline className="icon" />
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Remote">Remote</option>
//             <option value="On-site">On-site</option>
//           </select>
//         </div>

//         {/* Location Filter */}
//         <div className="input-icon">
//           <MdLocationOn className="icon" />
//           <input
//             type="text"
//             placeholder="Filter by location..."
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Internship Cards */}
//       <div className="internship-list">
//         {filteredInternships.length > 0 ? (
//           filteredInternships.map((internship) => (
//             <div key={internship.id} className="internship-card">
//               <h3>{internship.title}</h3>
//               <p><strong>Domain:</strong> {internship.company}</p>
//               <p><strong>Type:</strong> {internship.type}</p>
//               <p><strong>Duration:</strong> {internship.duration}</p>
//               <p><strong>Stipend:</strong> {internship.stipend}</p>
//               <p><strong>Location:</strong> {internship.location}</p>
//               <p className="details">{internship.details}</p>

//               {/* 🔹 Skill Match Progress Bar */}
//               <div className="progress-container">
//                 <div
//                   className="progress-bar"
//                   style={{
//                     width: `${internship.matchPercentage}%`,
//                     background:
//                       internship.matchPercentage >= 70
//                         ? "linear-gradient(90deg, #4caf50, #2e7d32)" // green
//                         : internship.matchPercentage >= 40
//                         ? "linear-gradient(90deg, #ff9800, #f57c00)" // orange
//                         : "linear-gradient(90deg, #f44336, #c62828)", // red
//                   }}
//                 ></div>
//               </div>
//               <p className="match-text">
//                 Skills Match: {internship.matchPercentage}%
//               </p>

//               <button className="apply-btn">Apply Now</button>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No internships found 🚫</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Discover;
