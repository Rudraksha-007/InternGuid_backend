import React, { useState, useEffect } from "react";
import "../App.css"; // or './ProfilePage.css' if you're using a separate CSS file
import Header from "./HeaderComponents/Header";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    age: "",
    skills: "",
    qualification: "",
    gender: "",
    resume: null,
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.contact || "",
        location: user.location?.[0] || "",
        age: user.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : "",
        skills: user.skills ? user.skills.join(", ") : "",
        qualification: user.education_level || "",
        gender: user.gender || "",
        resume: null,
        profileImage: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume" || name === "profileImage") {
      setProfile({ ...profile, [name]: files[0] });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  // Fetch applications when "Applications" tab is active
  useEffect(() => {
    if (activeTab === "applications" && profile.skills) {
      setLoading(true);
      fetch(`http://localhost:5000/api/applications?skills=${profile.skills}`)
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching applications:", err);
          setLoading(false);
        });
    }
  }, [activeTab, profile.skills]);

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-form-wrapper">
        <h2>Account Setting</h2>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </div>
          <div
            className={`tab ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </div>
        </div>

        {activeTab === "profile" && (
          <>
            <div className="image-upload">
              <label htmlFor="profileImage">
                {profile.profileImage ? (
                  <img
                    src={URL.createObjectURL(profile.profileImage)}
                    alt="Profile"
                    className="preview-img"
                  />
                ) : (
                  <div className="placeholder-img">Upload Image</div>
                )}
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={profile.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={profile.location}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={profile.age}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills (e.g. React, Java)"
                value={profile.skills}
                onChange={handleChange}
                required
              />
              <select
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                required
              >
                <option value="">Select Qualification</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="grad">Graduation</option>
              </select>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
              <div className="button-container">
                <button type="submit">Save</button>
              </div>
            </form>
          </>
        )}

        {activeTab === "applications" && (
          <div className="applications-section">
            {loading ? (
              <p>Loading applications...</p>
            ) : applications.length > 0 ? (
              applications.map((app) => (
                <div key={app.id} className="job-card">
                  <h3>{app.title}</h3>
                  <p>{app.company}</p>
                  <p>
                    <strong>Location:</strong> {app.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {app.status}
                  </p>
                  <p>
                    <strong>Skills:</strong> {app.skills.join(", ")}
                  </p>
                  <button className="apply-btn">View Details</button>
                </div>
              ))
            ) : (
              <p>No applications found for your skills.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
