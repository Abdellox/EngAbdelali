import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { showToast } from '../components/Toast'
import './Checkout.css'

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const [pickupTime, setPickupTime] = useState('15')
  const navigate = useNavigate()

  const tax = total * 0.08
  const finalTotal = total + tax

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error')
      return
    }
    showToast('Order placed successfully! ☕', 'success')
    clearCart()
    setTimeout(() => navigate('/'), 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="checkout container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious drinks to get started!</p>
          <Link to="/menu" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout container">
      <h1>Shopping Cart</h1>

      <div className="checkout-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item card">
              <div className="item-image">{item.image}</div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="summary-card card">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            <div className="pickup-time">
              <label htmlFor="pickup">Pickup Time</label>
              <select id="pickup" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div className="checkout-actions">
              <button className="btn-primary" onClick={handleCheckout}>
                Place Order
              </button>
              <Link to="/menu" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
