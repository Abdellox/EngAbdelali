import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ darkMode, toggleDarkMode, searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">WorldBite</span>
        </Link>
        
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search countries or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/countries">Countries</Link>
          <Link to="/foods">Foods</Link>
          <Link to="/drinks">Drinks</Link>
          <Link to="/daily">Daily Feature</Link>
          <Link to="/about">About</Link>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
