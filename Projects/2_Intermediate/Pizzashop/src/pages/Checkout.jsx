import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderType, setOrderType] = useState('delivery')
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  })

  const deliveryFee = orderType === 'delivery' ? 3.99 : 0
  const tax = (cartTotal * 0.08).toFixed(2)
  const total = (parseFloat(cartTotal) + parseFloat(deliveryFee) + parseFloat(tax)).toFixed(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmation(true)
    clearCart()
  }

  if (showConfirmation) {
    return (
      <div className="checkout-page fade-in">
        <div className="container">
          <div className="confirmation-card card">
            <div className="success-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your order, {formData.name}!</p>
            <div className="order-details">
              <p><strong>Order Number:</strong> #{Math.floor(Math.random() * 100000)}</p>
              <p><strong>Estimated Delivery:</strong> 30-40 minutes</p>
              <p><strong>Total:</strong> ${total}</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page fade-in">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        {cart.length === 0 ? (
          <div className="empty-cart card">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious pizzas to get started!</p>
            <button className="btn-primary" onClick={() => navigate('/menu')}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="cart-section">
              <div className="card">
                <h2>Your Order</h2>
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Size: {item.size}</p>
                      <p className="item-price">${item.price}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="card order-type">
                <h3>Order Type</h3>
                <div className="type-options">
                  <button
                    className={`type-btn ${orderType === 'delivery' ? 'active' : ''}`}
                    onClick={() => setOrderType('delivery')}
                  >
                    🚚 Delivery
                  </button>
                  <button
                    className={`type-btn ${orderType === 'pickup' ? 'active' : ''}`}
                    onClick={() => setOrderType('pickup')}
                  >
                    🏪 Pickup
                  </button>
                </div>
              </div>
            </div>

            <div className="order-section">
              <div className="card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>

              <form className="card checkout-form" onSubmit={handleSubmit}>
                <h2>Contact Information</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                
                {orderType === 'delivery' && (
                  <>
                    <h3>Delivery Address</h3>
                    <input
                      type="text"
                      placeholder="Street Address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <h3>Payment</h3>
                <input type="text" placeholder="Card Number" required />
                <div className="form-row">
                  <input type="text" placeholder="MM/YY" required />
                  <input type="text" placeholder="CVV" required />
                </div>

                <button type="submit" className="btn-primary full-width">
                  Place Order - ${total}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
