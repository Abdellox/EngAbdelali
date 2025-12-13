import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>المتجر المغربي</h1>
          </Link>

          <nav className="nav">
            <Link to="/">الرئيسية</Link>
            <Link to="/products">المنتجات</Link>
            {user?.role === 'admin' && <Link to="/admin">لوحة التحكم</Link>}
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </Link>

            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="user-link">
                  <FaUser /> {user.name}
                </Link>
                <button onClick={logout} className="logout-btn">
                  <FaSignOutAlt /> تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn-login">دخول</Link>
                <Link to="/register" className="btn-register">تسجيل</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
