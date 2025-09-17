import React from 'react';
import './Admin.css';
import Sidebar from './Sidebar';
export default function AdminDashboard() {
  const stats = [
    { title: 'Total Candidates', value: '12,847', hint: '+12% from last month', icon: '👥' },
    { title: 'Active Internships', value: '324', hint: '+8% from last month', icon: '💼' },
    { title: 'Successful Matches', value: '8,642', hint: '+23% from last month', icon: '📈' },
    { title: 'Pending Applications', value: '1,203', hint: '-5% from last month', icon: '⚠️' },
  ];

  const recentCandidates = [
    { name: 'Priya Sharma', meta: 'Rural Maharashtra • B.Com', status: 'Active' },
    { name: 'Anita Singh', meta: 'Urban Slum Delhi • B.A', status: 'Pending' },
    { name: 'Vijay Patel', meta: 'Remote Gujarat • B.Tech', status: 'Active' },
    { name: 'Sneha Reddy', meta: 'Rural Andhra Pradesh • M.A', status: 'Matched' },
  ];

  const popular = [
    { title: 'Data Entry Assistant', org: 'Tech Corp', apps: 234, matches: 87 },
    { title: 'Finance Assistant', org: 'Banking Solutions', apps: 156, matches: 78 },
    { title: 'Content Writer', org: 'Media House', apps: 143, matches: 45 },
  ];

  return (
    <div className="adm-root">
      {/* Sidebar */}
        <Sidebar />

      {/* Main Content */}
      <main className="adm-main">
        {/* Header */}
        <header className="adm-header">
          <div className="title">PM Internship Scheme</div>
          <div className="actions">
            <button className="add-btn">+ Add Internship</button>
            <div className="notif">🔔<span className="badge">3</span></div>
            <div className="profile">AD</div>
          </div>
        </header>

        {/* Overview */}
        <section className="overview">
          <h1>Dashboard Overview</h1>
          <p className="sub">Monitor the PM Internship Scheme's AI recommendation system performance</p>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-head">
                  <div className="stat-title">{s.title}</div>
                  <div className="stat-icon">{s.icon}</div>
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-hint">{s.hint}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Lists */}
        <section className="lists">
          {/* Recent Candidates */}
          <div className="card recent">
            <div className="card-head">
              <h2>Recent Candidates</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="card-body">
              {recentCandidates.map((c, i) => (
                <div className="candidate" key={i}>
                  <div>
                    <div className="cname">{c.name}</div>
                    <div className="cmeta">{c.meta}</div>
                  </div>
                  <div className={`status ${c.status.toLowerCase()}`}>{c.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Internships */}
          <div className="card popular">
            <div className="card-head">
              <h2>Popular Internships</h2>
              <button className="view-all">View All</button>
            </div>
            <div className="card-body">
              {popular.map((p, i) => (
                <div className="intern" key={i}>
                  <div>
                    <div className="ititle">{p.title}</div>
                    <div className="iorg">{p.org}</div>
                  </div>
                  <div className="imeta">
                    <div className="apps">{p.apps} applications</div>
                    <div className="matches">{p.matches} matches</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Metrics */}
        <section className="ai-metrics card">
          <h2>AI Recommendation Performance</h2>
          <p className="sub">System performance metrics and recommendation accuracy</p>
          <div className="ai-grid">
            <div className="metric">
              <div className="m-value">87.3%</div>
              <div className="m-label">Recommendation Accuracy</div>
            </div>
            <div className="metric">
              <div className="m-value">92.1%</div>
              <div className="m-label">User Satisfaction</div>
            </div>
            <div className="metric">
              <div className="m-value">2.3s</div>
              <div className="m-label">Avg Response Time</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
