// import React from "react";
// import "../App.css";
// import { Link } from "react-router-dom";
// const LoginPage = () => {
//   return (
// <div className="login-container">
//   <div className="login-form">
//     <div className="form-box">
//       <h2>Welcome Back to InternHub!</h2>
//       <p className="sub-text">Sign in to explore opportunities</p>

//       <form>
//         <label>Email</label>
//         <input type="email" placeholder="Enter your email" required />

//         <label>Password</label>
//         <input type="password" placeholder="Enter your password" required />

//         <div className="form-options">
//           <label>
//             <input type="checkbox" /> Remember Me
//           </label>
//           <a href="/">Forgot Password?</a>
//         </div>

//         <button type="submit" className="login-btn">
//           Login
//         </button>
//       </form>

//       <p className="register-text">
//         New to InternHub?<Link to="/SignUp">Sign Up</Link>

//       </p>
//     </div>
//   </div>
// </div>

//   );
// };

// export default LoginPage;



import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // store error messages
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    setLoading(true);

    // ✅ basic validation
    if (!email || !password) {
      setError("Email and Password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // backend may return error message
        setError(data.message || "Login failed. Please try again.");
      } else {
        // ✅ Login success → navigate to dashboard
        localStorage.setItem("token", data.token); // optional: save token
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="form-box">
          <h2>Welcome Back to InternHub!</h2>
          <p className="sub-text">Sign in to explore opportunities</p>

          {/* 🔹 Error message */}
          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-text">
            New to InternHub? <Link to="/SignUp">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
