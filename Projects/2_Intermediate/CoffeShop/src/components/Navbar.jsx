import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { cart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">☕</span>
          <span className="logo-text">Coffee Bliss</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
          <li><Link to="/specials" onClick={() => setMenuOpen(false)}>Specials</Link></li>
          <li><Link to="/drink-builder" onClick={() => setMenuOpen(false)}>Build Your Drink</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/checkout" className="cart-btn">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
