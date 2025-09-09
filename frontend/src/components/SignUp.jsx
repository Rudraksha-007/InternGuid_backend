import React from 'react';

const SignUp = () => {
  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2>Sign up</h2>
        <p>Join the community today!</p>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="text" placeholder="Location" required />
          <input type="number" placeholder="Age" required />
          <input type="text" placeholder="Skills (e.g. React, Java)" required />

          <select required>
            <option value="">Select Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="grad">Graduation</option>
          </select>

          <select required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="file" accept=".pdf,.doc,.docx" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
