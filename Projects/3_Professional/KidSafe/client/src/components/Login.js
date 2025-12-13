import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'parent'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock login/register
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: formData.role
    };
    
    onLogin(user);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🛡️ KidSafe</h1>
          <p>Child Safety Platform for Working Parents</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {isRegister && (
            <div className="form-group">
              <label>I am a</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
              </select>
            </div>
          )}
          
          <button type="submit" className="login-btn">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <button 
            className="toggle-btn" 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
        
        <div className="demo-accounts">
          <p><strong>Demo Accounts:</strong></p>
          <p>Parent: parent@demo.com / password</p>
          <p>Child: child@demo.com / password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
