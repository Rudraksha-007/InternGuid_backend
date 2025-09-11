import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
// import { Button } from "@/components/ui/button";
import  Progress  from "../ui/progress.jsx";
import { Badge } from "../ui/badge.jsx";
import { 
  Users, 
  Building2, 
  MapPin, 
  Star, 
  TrendingUp, 
  Filter,
  Search,
  Zap
} from "lucide-react";
import "./MainDashboard.css";

const MainDashboard = () => {
  const topMatches = [
    {
      id: 1,
      company: "Tech Innovators Pvt Ltd",
      position: "Software Development Intern",
      location: "Bangalore, Karnataka",
      matchScore: 96,
      sector: "Technology",
      skills: ["React", "Python", "Machine Learning"],
      diversity: "Rural Background Preferred",
      stipend: "₹25,000/month"
    },
    {
      id: 2,
      company: "Green Energy Solutions",
      position: "Renewable Energy Research Intern",
      location: "Pune, Maharashtra", 
      matchScore: 89,
      sector: "Energy",
      skills: ["Data Analysis", "Environmental Science", "R"],
      diversity: "Female Candidate Priority",
      stipend: "₹20,000/month"
    },
    {
      id: 3,
      company: "FinTech Dynamics",
      position: "Financial Analytics Intern",
      location: "Mumbai, Maharashtra",
      matchScore: 84,
      sector: "Finance",
      skills: ["Excel", "SQL", "Financial Modeling"],
      diversity: "SC/ST Category",
      stipend: "₹30,000/month"
    }
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        {/* <div className="dashboard-header">
          <h2>AI-Powered Matching Dashboard</h2>
          <p>
            Real-time intelligent matching with affirmative action considerations
          </p>
        </div> */}

        {/* Stats Section */}
        <div className="greeting-card">
        <div>
          <h2 className="greeting-title">Hi, Alyssa 👋</h2>
          <p className="greeting-subtitle">
            Ready to explore internships and boost your career?
          </p>
        </div>
        <div className="points-card">⭐ 320 Points</div>
      </div>
        <div className="stats-grid">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>
                <Users className="icon primary" />
                Total Candidates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stat-number">12,847</div>
              <div className="stat-sub">
                <TrendingUp className="inline-icon" />
                +15% this month
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>
                <Building2 className="icon secondary" />
                Active Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stat-number">1,234</div>
              <div className="stat-sub">
                <TrendingUp className="inline-icon" />
                +8% this week
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>
                <Zap className="icon primary" />
                Matches Made
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stat-number">8,956</div>
              <div className="stat-sub">
                <TrendingUp className="inline-icon" />
                +23% success rate
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader>
              <CardTitle>
                <Star className="icon secondary" />
                Avg. Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stat-number">87%</div>
              <div className="stat-sub">
                <TrendingUp className="inline-icon" />
                +5% improvement
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="main-grid">
          <div className="matches">
            <Card>
              <CardHeader>
                <div className="matches-header">
                  <CardTitle>Top Matches for You</CardTitle>
                  <div className="matches-actions">
                    <button variant="outline" size="sm">
                      <Filter className="btn-icon" /> Filter
                    </button>
                    <button variant="outline" size="sm">
                      <Search className="btn-icon" /> Search
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {topMatches.map((match) => (
                  <div key={match.id} className="match-card">
                    <div className="match-top">
                      <div>
                        <h3>{match.position}</h3>
                        <p>{match.company}</p>
                      </div>
                      <div className="match-score">
                        <div>{match.matchScore}%</div>
                        <small>Match Score</small>
                      </div>
                    </div>

                    <div className="match-info">
                      <MapPin className="inline-icon" />
                      <span>{match.location}</span>
                      <Badge variant="outline">{match.sector}</Badge>
                      <span className="stipend">{match.stipend}</span>
                    </div>

                    <div className="match-skills">
                      <div className="skills-progress">
                        <span>Skills Match:</span>
                        <Progress value={match.matchScore} />
                      </div>
                      <div className="skills-list">
                        {match.skills.map((skill, index) => (
                          <Badge className="match-skill" key={index} variant="secondary">{skill} </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="match-footer">
                      <div className="diversity">
                        <Star className="inline-icon secondary" />
                        <span className="match-diversity">{match.diversity}</span>
                      </div>
                      <button className="match-btn">Apply Now</button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="side-panel">
            <Card>
              <CardHeader>
                <CardTitle>Matching Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="criteria">
                  <div className="criteria-row">
                    <span>Skills Alignment</span><span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="criteria">
                  <div className="criteria-row">
                    <span>Location Preference</span><span>100%</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="criteria">
                  <div className="criteria-row">
                    <span>Sector Interest</span><span>87%</span>
                  </div>
                  <Progress value={87} />
                </div>
                <div className="criteria">
                  <div className="criteria-row">
                    <span>Diversity Factors</span><span>95%</span>
                  </div>
                  <Progress value={95} />
                </div>
              </CardContent>
            </Card>

            <Card className="affirmative-card">
              <CardHeader>
                <CardTitle>Affirmative Action Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="affirmative-list">
                  <div><span>Rural Background</span><Badge variant="secondary">Eligible</Badge></div>
                  <div><span>Category: SC/ST</span><Badge variant="secondary">Verified</Badge></div>
                  <div><span>First Generation Graduate</span><Badge variant="secondary">Yes</Badge></div>
                </div>
                <button className="update-btn">Update Information</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDashboard;
