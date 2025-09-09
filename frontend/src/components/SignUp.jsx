import React from "react";
import "../App.css";

const SignUpPage = () => {
  return (
    <div className="login-container">
      {/* Left Side Image with Text */}
      <div className="login-image">
        <div className="overlay-text">
          <h2>Join InternHub</h2>
          <p>Kickstart your career by discovering amazing opportunities</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="login-form">
        <div className="form-box">
          <h2>Create Your Account</h2>
          <p className="sub-text">Sign up to start your internship journey</p>

          <form>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />

            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" required />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Location</label>
            <input type="text" placeholder="Enter your location" required />

            <label>Educational Qualification</label>
            <select required>
              <option value="">Select Qualification</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="graduation">Graduation Degree</option>
            </select>

            <label>Age</label>
            <input type="number" placeholder="Enter your age" required />

            <label>Gender</label>
            <select required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>

            <label>Skills</label>
            <input type="text" placeholder="e.g. Java, Python, React" required />

            <label>Upload Resume (PDF)</label>
            <input type="file" accept=".pdf,.doc,.docx" required />

            <button type="submit" className="login-btn">Sign Up</button>
          </form>

          <p className="register-text">
            Already have an account? <a href="/">Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
