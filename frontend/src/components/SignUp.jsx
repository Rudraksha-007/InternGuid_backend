import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    dob: "",
    qualification: "",
    region: "",
    location: "",
    skills: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container signup-container">
      <div className="login-form">
        <div className="form-box">
          <h2>Join PM Internship Scheme!</h2>
          <p className="sub-text">Create your account to explore opportunities</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />

            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="Enter your age" />

            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

            <label>Educational Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="E.g. B.Tech, B.Sc, etc." />

            <label>Region</label>
            <select name="region" value={formData.region} onChange={handleChange} required>
              <option value="">Select Region</option>
              <option value="Rural">Rural</option>
              <option value="Urban">Urban</option>
            </select>

            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="Enter your location" />

            <label>Skills</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} required placeholder="E.g. React, Python, Excel" />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="register-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
