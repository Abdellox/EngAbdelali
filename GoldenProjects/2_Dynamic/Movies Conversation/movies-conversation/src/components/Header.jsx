import React from 'react';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="logo">
            <span className="logo-icon">📖</span>
            SeriesRead
          </h1>
          <p className="tagline">Read TV episodes like books</p>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode} 
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
          aria-label="Toggle theme"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;
