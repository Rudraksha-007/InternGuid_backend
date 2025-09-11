import React from "react";
import "./Home.css";
import heroImage from "/background.jpg"; // adjust path
import { Users, Brain, Target, ArrowRight } from "lucide-react";
import {Link} from "react-router-dom";
const Hero = () => {

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-background">
        <img
          src={heroImage}
          alt="Students and professionals collaborating in modern workspace"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>
          Smart <span className="highlight">AI-Powered</span> <br />
          Internship Matching
        </h1>

        <p>
          Revolutionizing the PM Internship Scheme with intelligent algorithms
          that match students with perfect opportunities based on skills,
          location, and sector preferences.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <Link to="/Dashboard" className="btn btn-primary flex items-center gap-2">
            Find My Match <ArrowRight className="icon" />
          </Link>
          <a href="#HowItWorks" className="btn btn-outline">How It Works</a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat">
            <Users className="stat-icon" />
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Students Matched</div>
          </div>
          <div className="stat">
            <Brain className="stat-icon" />
            <div className="stat-number">98%</div>
            <div className="stat-label">Match Accuracy</div>
          </div>
          <div className="stat">
            <Target className="stat-icon" />
            <div className="stat-number">500+</div>
            <div className="stat-label">Industry Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
