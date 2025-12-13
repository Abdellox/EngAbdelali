import React, { useState, useEffect } from 'react';
import './ChildApp.css';

function ChildApp({ user, onLogout }) {
  const [location, setLocation] = useState(null);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Finish homework', completed: false, points: 10 },
    { id: '2', title: 'Clean room', completed: false, points: 15 },
    { id: '3', title: 'Practice piano', completed: false, points: 20 }
  ]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setLastCheckIn(now);
    alert('✅ Check-in successful! Your parents have been notified.');
  };

  const handleEmergency = () => {
    if (window.confirm('🚨 Are you sure you want to send an emergency alert to your parents?')) {
      alert('🚨 EMERGENCY ALERT SENT! Your parents and emergency contacts have been notified with your location.');
    }
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        setTotalPoints(totalPoints + task.points);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const getTimeSince = (timestamp) => {
    if (!timestamp) return 'Never';
    const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  return (
    <div className="child-app">
      <div className="header">
        <div className="header-content">
          <h1>🛡️ KidSafe</h1>
          <div className="header-actions">
            <span className="user-info">Hi, {user.name}! 👋</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Emergency Button - Always Visible */}
        <div className="emergency-section">
          <button onClick={handleEmergency} className="danger-btn emergency-btn">
            🚨 EMERGENCY
          </button>
          <p className="emergency-text">Press if you need help immediately</p>
        </div>

        <div className="child-grid">
          {/* Check-in Card */}
          <div className="card checkin-card">
            <h2>Safety Check-in</h2>
            <div className="checkin-status">
              <div className="status-icon">
                {lastCheckIn && (Date.now() - new Date(lastCheckIn)) < 3600000 ? '✅' : '⏰'}
              </div>
              <p>Last check-in: {getTimeSince(lastCheckIn)}</p>
            </div>
            <button onClick={handleCheckIn} className="primary-btn checkin-btn">
              ✓ I'm Safe
            </button>
            <p className="hint-text">Let your parents know you're okay</p>
          </div>

          {/* Location Card */}
          <div className="card location-card">
            <h2>📍 My Location</h2>
            {location ? (
              <div className="location-display">
                <p className="location-status">✅ Location sharing is ON</p>
                <p className="location-coords">
                  Lat: {location.latitude.toFixed(4)}<br/>
                  Lng: {location.longitude.toFixed(4)}
                </p>
                <p className="hint-text">Your parents can see where you are</p>
              </div>
            ) : (
              <div className="location-display">
                <p className="location-status">⚠️ Location not available</p>
                <p className="hint-text">Please enable location services</p>
              </div>
            )}
          </div>

          {/* Tasks & Rewards */}
          <div className="card tasks-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>My Tasks</h2>
              <div className="points-badge">
                ⭐ {totalPoints} points
              </div>
            </div>
            
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskComplete(task.id)}
                      disabled={task.completed}
                    />
                    <span className="task-title">{task.title}</span>
                  </div>
                  <span className="task-points">+{task.points} pts</span>
                </div>
              ))}
            </div>
            
            {tasks.every(t => t.completed) && (
              <div className="completion-message">
                🎉 Great job! All tasks completed!
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card actions-card">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn">
                <span className="action-icon">💬</span>
                <span>Message Parents</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📞</span>
                <span>Call Mom/Dad</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">📚</span>
                <span>Homework Help</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">🎮</span>
                <span>Screen Time Left</span>
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="card schedule-card">
            <h2>📅 Today's Schedule</h2>
            <div className="schedule-list">
              <div className="schedule-item completed">
                <span className="schedule-time">8:00 AM</span>
                <span className="schedule-title">School</span>
                <span className="schedule-status">✓</span>
              </div>
              <div className="schedule-item completed">
                <span className="schedule-time">3:30 PM</span>
                <span className="schedule-title">Soccer Practice</span>
                <span className="schedule-status">✓</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-time">6:00 PM</span>
                <span className="schedule-title">Dinner</span>
                <span className="schedule-status">⏰</span>
              </div>
              <div className="schedule-item">
                <span className="schedule-time">8:00 PM</span>
                <span className="schedule-title">Bedtime</span>
                <span className="schedule-status">⏰</span>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="card tips-card">
            <h2>💡 Safety Tip of the Day</h2>
            <div className="tip-content">
              <p className="tip-text">
                Always tell your parents or a trusted adult where you're going and when you'll be back.
              </p>
              <p className="tip-emoji">🏠➡️👨‍👩‍👧‍👦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildApp;
