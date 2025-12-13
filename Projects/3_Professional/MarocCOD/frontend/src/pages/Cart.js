import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>عربة التسوق فارغة</h2>
          <Link to="/products" className="btn-primary">تصفح المنتجات</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>عربة التسوق</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_main || '/placeholder.jpg'} alt={item.name_ar} />
                
                <div className="item-details">
                  <h3>{item.name_ar}</h3>
                  <p className="item-price">
                    {item.discount_price || item.price} درهم
                  </p>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="item-total">
                  {((item.discount_price || item.price) * item.quantity).toFixed(2)} درهم
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>ملخص الطلب</h3>
            <div className="summary-row">
              <span>المجموع الفرعي:</span>
              <span>{getCartTotal().toFixed(2)} درهم</span>
            </div>
            <div className="summary-row">
              <span>الشحن:</span>
              <span>مجاني</span>
            </div>
            <div className="summary-total">
              <span>المجموع الكلي:</span>
              <span>{getCartTotal().toFixed(2)} درهم</span>
            </div>
            <button className="btn-primary" onClick={handleCheckout}>
              إتمام الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
