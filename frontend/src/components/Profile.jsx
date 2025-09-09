import React, { useState, useEffect } from "react";
import "../App.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch vacancies when "Vacancies" tab is clicked
  useEffect(() => {
    if (activeTab === "vacancies" && profile.skills) {
      setLoading(true);
      fetch(`http://localhost:5000/api/vacancies?skills=${profile.skills}`)
        .then((res) => res.json())
        .then((data) => {
          setVacancies(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching vacancies:", err);
          setLoading(false);
        });
    }
  }, [activeTab, profile.skills]);

  return (
    <div className="profile-container">
      <div className="profile-form-wrapper">
        <h2>Account Setting</h2>

        {/* Tabs */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </div>
          <div
            className={`tab ${activeTab === "vacancies" ? "active" : ""}`}
            onClick={() => setActiveTab("vacancies")}
          >
            Vacancies
          </div>
        </div>

        {/* Profile Section */}
        {activeTab === "profile" && (
          <>
            {/* Profile image upload */}
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

        {/* Vacancies Section */}
        {activeTab === "vacancies" && (
          <div className="vacancies-section">
            {loading ? (
              <p>Loading vacancies...</p>
            ) : vacancies.length > 0 ? (
              vacancies.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Required Skills:</strong> {job.skills.join(", ")}
                  </p>
                  <button className="apply-btn">Apply</button>
                </div>
              ))
            ) : (
              <p>No vacancies found for your skills.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
