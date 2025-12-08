import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

const Navbar = () => {
  const { cartCount } = useCart()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className="nav-bar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍕</span>
          <span className="logo-text">Pizza Palace</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/deals">Deals</Link></li>
          <li><Link to="/build">Build Pizza</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/checkout" className="cart-btn">
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
