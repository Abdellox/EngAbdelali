import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1>SecureVote</h1>
        </Link>
        <nav style={styles.nav}>
          <Link to="/elections" style={styles.link}>Elections</Link>
          <Link to="/verify" style={styles.link}>Verify Vote</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: '#1976D2',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none'
  }
};

export default Header;
