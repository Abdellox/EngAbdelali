import React, { useState } from 'react'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Thanks for subscribing with ${email}!`)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Coffee Bliss</h3>
            <p>Brewed with Passion, Served with Love.</p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/specials">Specials</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Hours</h4>
            <p>Mon-Fri: 6:00 AM - 8:00 PM</p>
            <p>Sat-Sun: 7:00 AM - 9:00 PM</p>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Coffee Bliss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
