import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Alerts.css';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alerts?limit=100');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleAcknowledge = async (alertId) => {
    try {
      await axios.put(`http://localhost:5000/api/alerts/${alertId}/acknowledge`);
      fetchAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter);

  return (
    <div>
      <Navbar />
      <div className="container alerts-page">
        <div className="alerts-header">
          <h1>Alerts & Notifications</h1>
          <div className="alert-filters">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'emergency' ? 'active' : ''} 
              onClick={() => setFilter('emergency')}
            >
              🚨 Emergency
            </button>
            <button 
              className={filter === 'urgent' ? 'active' : ''} 
              onClick={() => setFilter('urgent')}
            >
              ⚠️ Urgent
            </button>
            <button 
              className={filter === 'attention' ? 'active' : ''} 
              onClick={() => setFilter('attention')}
            >
              ⚡ Attention
            </button>
            <button 
              className={filter === 'info' ? 'active' : ''} 
              onClick={() => setFilter('info')}
            >
              ℹ️ Info
            </button>
          </div>
        </div>

        <div className="alerts-list-full">
          {filteredAlerts.length === 0 ? (
            <div className="card">
              <p>No alerts found.</p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div key={alert.id} className={`alert-card alert-${alert.type}`}>
                <div className="alert-header-row">
                  <div className="alert-icon-large">
                    {alert.type === 'emergency' && '🚨'}
                    {alert.type === 'urgent' && '⚠️'}
                    {alert.type === 'attention' && '⚡'}
                    {alert.type === 'info' && 'ℹ️'}
                  </div>
                  <div className="alert-details">
                    <h3>{alert.title}</h3>
                    <p>{alert.message}</p>
                    <span className="alert-timestamp">
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {!alert.acknowledged && (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      Acknowledge
                    </button>
                  )}
                  {alert.acknowledged && (
                    <span className="acknowledged-badge">✓ Acknowledged</span>
                  )}
                </div>
                {alert.location && (
                  <div className="alert-location">
                    📍 Location: {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
