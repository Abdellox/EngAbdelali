import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🛡️ KidSafe
      </Link>
      
      <ul className="navbar-menu">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/alerts">Alerts</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
      
      <div className="navbar-user">
        <span className="user-name">{user?.name}</span>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
