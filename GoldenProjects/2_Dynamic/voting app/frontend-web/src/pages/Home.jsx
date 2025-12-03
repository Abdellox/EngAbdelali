import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to SecureVote</h1>
      <p style={styles.subtitle}>
        A blockchain-based voting platform ensuring security, transparency, and accessibility
      </p>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>🔒 Secure</h3>
          <p>End-to-end encryption and blockchain technology</p>
        </div>
        <div style={styles.feature}>
          <h3>👁️ Transparent</h3>
          <p>Real-time results and verifiable audit trails</p>
        </div>
        <div style={styles.feature}>
          <h3>♿ Accessible</h3>
          <p>Multi-platform, multi-language support</p>
        </div>
      </div>

      <div style={styles.actions}>
        <Link to="/register" style={styles.primaryBtn}>Get Started</Link>
        <Link to="/elections" style={styles.secondaryBtn}>View Elections</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem 2rem'
  },
  title: {
    fontSize: '3rem',
    color: '#1976D2',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '3rem'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    margin: '3rem 0'
  },
  feature: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '3rem'
  },
  primaryBtn: {
    background: '#2196F3',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1.1rem'
  },
  secondaryBtn: {
    background: 'white',
    color: '#2196F3',
    padding: '1rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    border: '2px solid #2196F3'
  }
};

export default Home;
