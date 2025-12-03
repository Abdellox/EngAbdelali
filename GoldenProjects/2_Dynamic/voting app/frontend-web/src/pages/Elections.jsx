import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Elections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const response = await api.get('/elections/active');
      setElections(response.data.data.elections);
    } catch (error) {
      console.error('Failed to load elections:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading elections...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Active Elections</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {elections.map(election => (
          <div key={election.id} style={styles.card}>
            <h3>{election.title}</h3>
            <p>{election.description}</p>
            <p>Start: {new Date(election.startDate).toLocaleDateString()}</p>
            <p>End: {new Date(election.endDate).toLocaleDateString()}</p>
            <Link to={`/vote/${election.id}`} style={styles.button}>
              Vote Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  button: {
    display: 'inline-block',
    background: '#2196F3',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    textDecoration: 'none',
    marginTop: '1rem'
  }
};

export default Elections;
