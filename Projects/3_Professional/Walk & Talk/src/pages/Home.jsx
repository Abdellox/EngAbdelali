import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Walk, Talk, Connect</h1>
        <p>Find someone to walk with and have meaningful conversations</p>
        <div className="cta-buttons">
          <Link to="/find-walker" className="btn btn-primary">Find a Walking Partner</Link>
          <Link to="/routes" className="btn btn-secondary">Explore Routes</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="icon">🗺️</span>
          <h3>Choose Your Route</h3>
          <p>Parks, gardens, city centers - pick your perfect walking spot</p>
        </div>
        <div className="feature-card">
          <span className="icon">💬</span>
          <h3>Conversation Style</h3>
          <p>Calm, motivational, or deep chat - you decide the vibe</p>
        </div>
        <div className="feature-card">
          <span className="icon">🧘</span>
          <h3>Reduce Stress</h3>
          <p>Walking and talking is proven to improve mental wellbeing</p>
        </div>
        <div className="feature-card">
          <span className="icon">👥</span>
          <h3>Professional Walkers</h3>
          <p>Life coaches and friendly companions ready to listen</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
