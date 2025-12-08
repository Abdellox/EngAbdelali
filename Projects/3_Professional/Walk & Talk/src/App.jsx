import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FindWalker from './pages/FindWalker';
import RouteSelector from './pages/RouteSelector';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">🚶 Walk & Talk</Link>
            <div className="nav-links">
              <Link to="/find-walker">Find Walker</Link>
              <Link to="/routes">Routes</Link>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-walker" element={<FindWalker />} />
          <Route path="/routes" element={<RouteSelector />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
