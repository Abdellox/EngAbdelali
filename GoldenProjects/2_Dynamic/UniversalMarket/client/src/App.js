import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'x-auth-token': token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.email) {
            setUser(data);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
