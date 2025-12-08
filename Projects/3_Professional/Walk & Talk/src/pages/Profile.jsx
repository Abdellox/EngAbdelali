import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    preferredStyle: 'calm',
    bio: 'Love walking and meeting new people. Looking for meaningful conversations.',
  });

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Your Profile</h1>
        
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">👤</div>
            <h2>{profile.name}</h2>
            <p className="email">{profile.email}</p>
            
            <div className="profile-section">
              <h3>Preferred Conversation Style</h3>
              <select 
                value={profile.preferredStyle}
                onChange={(e) => setProfile({...profile, preferredStyle: e.target.value})}
              >
                <option value="calm">Calm</option>
                <option value="motivational">Motivational</option>
                <option value="deep">Deep Chat</option>
              </select>
            </div>

            <div className="profile-section">
              <h3>About Me</h3>
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows="4"
              />
            </div>

            <button className="save-btn">Save Changes</button>
          </div>

          <div className="stats-card">
            <h3>Your Walking Stats</h3>
            <div className="stat-item">
              <span className="stat-icon">🚶</span>
              <div>
                <div className="stat-value">23</div>
                <div className="stat-label">Total Walks</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📏</span>
              <div>
                <div className="stat-value">87.5 km</div>
                <div className="stat-label">Distance Walked</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <div>
                <div className="stat-value">18.5 hrs</div>
                <div className="stat-label">Time Spent</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div>
                <div className="stat-value">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
