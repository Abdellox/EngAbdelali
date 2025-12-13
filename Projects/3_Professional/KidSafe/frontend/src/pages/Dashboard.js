import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function Dashboard() {
  const [children, setChildren] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [childrenRes, alertsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/children'),
        axios.get('http://localhost:5000/api/alerts?limit=5')
      ]);
      setChildren(childrenRes.data);
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container dashboard">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <Link to="/child/new" className="btn btn-primary">+ Add Child</Link>
        </div>

        <div className="dashboard-grid">
          <div className="children-section">
            <h2>Your Children</h2>
            {children.length === 0 ? (
              <div className="card">
                <p>No children added yet. Click "Add Child" to get started.</p>
              </div>
            ) : (
              <div className="children-grid">
                {children.map(child => (
                  <Link to={`/child/${child.id}`} key={child.id} className="child-card">
                    <div className="child-avatar">
                      {child.photo ? (
                        <img src={child.photo} alt={child.name} />
                      ) : (
                        <div className="avatar-placeholder">{child.name[0]}</div>
                      )}
                    </div>
                    <h3>{child.name}</h3>
                    <p className="child-info">Age {child.age} • Grade {child.grade}</p>
                    {child.lastCheckIn && (
                      <p className="last-checkin">
                        ✓ Last check-in: {new Date(child.lastCheckIn).toLocaleTimeString()}
                      </p>
                    )}
                    {child.currentLocation && (
                      <div className="location-badge">📍 Location tracked</div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="alerts-section">
            <div className="section-header">
              <h2>Recent Alerts</h2>
              <Link to="/alerts">View All</Link>
            </div>
            {alerts.length === 0 ? (
              <div className="card">
                <p>No alerts. Everything is good! 👍</p>
              </div>
            ) : (
              <div className="alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                    <div className="alert-icon">
                      {alert.type === 'emergency' && '🚨'}
                      {alert.type === 'urgent' && '⚠️'}
                      {alert.type === 'attention' && '⚡'}
                      {alert.type === 'info' && 'ℹ️'}
                    </div>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.message}</p>
                      <span className="alert-time">
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/map" className="action-card">
              <span className="action-icon">🗺️</span>
              <h3>View Map</h3>
              <p>See all children's locations</p>
            </Link>
            <Link to="/messages" className="action-card">
              <span className="action-icon">💬</span>
              <h3>Messages</h3>
              <p>Chat with your children</p>
            </Link>
            <Link to="/settings" className="action-card">
              <span className="action-icon">⚙️</span>
              <h3>Settings</h3>
              <p>Manage geofences & helpers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
