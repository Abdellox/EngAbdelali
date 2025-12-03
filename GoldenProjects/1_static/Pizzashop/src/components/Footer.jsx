import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🍕 Pizza Palace</h3>
            <p>Fresh. Hot. Handcrafted.</p>
            <p>Every Slice Matters.</p>
            <div className="social-links">
              <a href="#">📘</a>
              <a href="#">📷</a>
              <a href="#">🐦</a>
              <a href="#">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/deals">Deals</Link></li>
              <li><Link to="/build">Build Pizza</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Franchise</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📍 123 Pizza Street</p>
            <p>New York, NY 10001</p>
            <p>📞 (555) 123-4567</p>
            <p>✉️ info@pizzapalace.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Pizza Palace. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
