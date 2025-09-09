import React from "react";
import "../App.css";

const LoginPage = () => {
  return (
<div className="login-container">
  <div className="login-form">
    <div className="form-box">
      <h2>Welcome Back to InternHub!</h2>
      <p className="sub-text">Sign in to explore opportunities</p>

      <form>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" required />

        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="/">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      <p className="register-text">
        New to InternHub? <a href="/">Register Now</a>
      </p>
    </div>
  </div>
</div>

  );
};

export default LoginPage;



