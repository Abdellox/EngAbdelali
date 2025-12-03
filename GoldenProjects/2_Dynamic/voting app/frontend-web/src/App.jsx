import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Elections from './pages/Elections';
import Vote from './pages/Vote';
import Results from './pages/Results';
import VerifyVote from './pages/VerifyVote';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { i18n } = useTranslation();

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyVote />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/elections" element={
              <PrivateRoute><Elections /></PrivateRoute>
            } />
            <Route path="/vote/:electionId" element={
              <PrivateRoute><Vote /></PrivateRoute>
            } />
            <Route path="/results/:electionId" element={
              <Results />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
