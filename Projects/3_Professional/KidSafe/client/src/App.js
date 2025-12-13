import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ParentDashboard from './components/ParentDashboard';
import ChildApp from './components/ChildApp';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('kidsafe-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('kidsafe-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kidsafe-user');
  };

  if (loading) {
    return <div className="loading">Loading KidSafe...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/" 
            element={
              !user ? <Navigate to="/login" /> :
              user.role === 'parent' ? <ParentDashboard user={user} onLogout={handleLogout} /> :
              <ChildApp user={user} onLogout={handleLogout} />
            } 
          />
          <Route 
            path="/child" 
            element={
              !user ? <Navigate to="/login" /> :
              <ChildApp user={user} onLogout={handleLogout} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
