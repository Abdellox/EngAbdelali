import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Welcome to your voter dashboard!</p>
      <Link to="/elections">View Active Elections</Link>
    </div>
  );
}

export default Dashboard;
