import React, { useState } from 'react';
import './FindWalker.css';

const walkers = [
  { id: 1, name: 'Sarah Johnson', type: 'Life Coach', specialty: 'Motivational', rating: 4.9, walks: 127, image: '👩‍💼' },
  { id: 2, name: 'Mike Chen', type: 'Friendly Companion', specialty: 'Calm', rating: 4.8, walks: 89, image: '👨' },
  { id: 3, name: 'Emma Davis', type: 'Therapist', specialty: 'Deep Chat', rating: 5.0, walks: 203, image: '👩‍⚕️' },
  { id: 4, name: 'Alex Rivera', type: 'Friendly Companion', specialty: 'Motivational', rating: 4.7, walks: 56, image: '🧑' },
  { id: 5, name: 'Lisa Park', type: 'Life Coach', specialty: 'Deep Chat', rating: 4.9, walks: 145, image: '👩' },
  { id: 6, name: 'James Wilson', type: 'Friendly Companion', specialty: 'Calm', rating: 4.6, walks: 78, image: '👨‍🦱' },
];

function FindWalker() {
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredWalkers = walkers.filter(walker => {
    const styleMatch = selectedStyle === 'all' || walker.specialty.toLowerCase() === selectedStyle;
    const typeMatch = selectedType === 'all' || walker.type === selectedType;
    return styleMatch && typeMatch;
  });

  return (
    <div className="find-walker">
      <div className="container">
        <h1>Find Your Walking Partner</h1>
        
        <div className="filters">
          <div className="filter-group">
            <label>Conversation Style:</label>
            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
              <option value="all">All Styles</option>
              <option value="calm">Calm</option>
              <option value="motivational">Motivational</option>
              <option value="deep chat">Deep Chat</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Walker Type:</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="Life Coach">Life Coach</option>
              <option value="Therapist">Therapist</option>
              <option value="Friendly Companion">Friendly Companion</option>
            </select>
          </div>
        </div>

        <div className="walkers-grid">
          {filteredWalkers.map(walker => (
            <div key={walker.id} className="walker-card">
              <div className="walker-avatar">{walker.image}</div>
              <h3>{walker.name}</h3>
              <p className="walker-type">{walker.type}</p>
              <div className="walker-specialty">{walker.specialty}</div>
              <div className="walker-stats">
                <span>⭐ {walker.rating}</span>
                <span>🚶 {walker.walks} walks</span>
              </div>
              <button className="book-btn">Book a Walk</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindWalker;
