import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { ArrowRight, UserCheck, Search, BarChart, CheckCircle } from "lucide-react";
import "./Home.css"; // custom CSS
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Profile Creation",
      description:
        "Students create comprehensive profiles including skills, qualifications, location preferences, and sector interests.",
      details: [
        "Academic background",
        "Technical skills",
        "Location preferences",
        "Sector interests",
        "Social category details",
      ],
    },
    {
      step: "02",
      icon: Search,
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms analyze student profiles against available internship opportunities and industry requirements.",
      details: [
        "Skill matching",
        "Geographic analysis",
        "Capacity assessment",
        "Affirmative action consideration",
        "Merit evaluation",
      ],
    },
    {
      step: "03",
      icon: BarChart,
      title: "Smart Matching",
      description:
        "The system generates optimized matches considering all factors including diversity requirements and industry capacity.",
      details: [
        "Multi-factor scoring",
        "Diversity balancing",
        "Capacity optimization",
        "Preference weighting",
        "Conflict resolution",
      ],
    },
    {
      step: "04",
      icon: CheckCircle,
      title: "Placement Confirmation",
      description:
        "Final placements are confirmed with both students and industry partners, ensuring mutual satisfaction.",
      details: [
        "Mutual confirmation",
        "Documentation",
        "Onboarding support",
        "Progress tracking",
        "Feedback collection",
      ],
    },
  ];

  return (
    <section id="HowItWorks" className="howitworks-section">
      <div className="howitworks-container">
        {/* Section Heading */}
        <div className="howitworks-heading">
          <h2>
            How Our <span className="highlight">AI Matching</span> Works
          </h2>
          <p>
            A transparent, intelligent process that ensures fair and optimal
            internship placements for thousands of students across diverse
            backgrounds and locations.
          </p>
        </div>

        {/* Steps */}
        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              {/* Step Number & Icon */}
              <div className="step-left">
                <div className="step-icon">
                  <step.icon className="icon" />
                </div>
                <div className="step-number">{step.step}</div>
              </div>

              {/* Step Content */}
              <Card className="step-card">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="step-description">{step.description}</p>
                  <div className="step-details">
                    {step.details.map((detail, i) => (
                      <div key={i} className="detail-item">
                        <div className="dot"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Arrow between steps */}
              {/* {index < steps.length - 1 && (
                <div className="arrow">
                  <ArrowRight className="icon" />
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta">
          <div className="cta-box">
            <h3>Ready to Find Your Perfect Internship Match?</h3>
            <p>
              Join thousands of students who have found their ideal internship
              opportunities through our intelligent matching system.
            </p>
            <div className="cta-buttons">
              {/* <button className="primary-btn">
                Start Matching Process <ArrowRight className="icon" />
              </button> */}
                <Link to="/dashboard" className="primary-btn">
                    Start Matching Process <ArrowRight className="icon" />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
