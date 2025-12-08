import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Toast from '../components/Toast'
import './PizzaBuilder.css'

const PizzaBuilder = () => {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  
  const [pizza, setPizza] = useState({
    size: 'M',
    crust: 'Hand-Tossed',
    sauce: 'Tomato',
    cheese: 'Mozzarella',
    toppings: []
  })

  const prices = {
    size: { S: 8, M: 12, L: 16, XL: 20 },
    crust: { 'Hand-Tossed': 0, 'Thin & Crispy': 0, 'Cheese Stuffed': 3, 'Deep Dish': 2 },
    sauce: { Tomato: 0, Marinara: 0, Alfredo: 1, Pesto: 1 },
    cheese: { Mozzarella: 0, 'Extra Mozzarella': 2, Cheddar: 1, 'Vegan Cheese': 2 },
    topping: 1.5
  }

  const toppings = [
    '🍖 Pepperoni', '🌭 Sausage', '🍗 Chicken', '🥓 Bacon',
    '🍄 Mushrooms', '🫑 Peppers', '🧅 Onions', '🫒 Olives',
    '🍍 Pineapple', '🌶️ Jalapeños', '🥬 Spinach', '🍅 Tomatoes', '🧀 Extra Cheese'
  ]

  const calculatePrice = () => {
    let total = prices.size[pizza.size]
    total += prices.crust[pizza.crust]
    total += prices.sauce[pizza.sauce]
    total += prices.cheese[pizza.cheese]
    total += pizza.toppings.length * prices.topping
    return total.toFixed(2)
  }

  const toggleTopping = (topping) => {
    setPizza(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping]
    }))
  }

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Custom Pizza',
      price: parseFloat(calculatePrice()),
      size: pizza.size,
      customization: pizza
    })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <>
      <div className="pizza-builder fade-in">
        <div className="builder-header">
          <div className="container">
            <h1>🍕 Build Your Own Pizza</h1>
            <p>Create your perfect pizza exactly how you like it</p>
          </div>
        </div>

        <div className="container">
          <div className="builder-content">
            <div className="builder-options">
              <div className="option-section">
                <h3>1. Choose Size</h3>
                <div className="option-grid">
                  {Object.keys(prices.size).map(size => (
                    <button
                      key={size}
                      className={`option-btn ${pizza.size === size ? 'active' : ''}`}
                      onClick={() => setPizza({ ...pizza, size })}
                    >
                      <span className="option-name">{size}</span>
                      <span className="option-price">+${prices.size[size]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-section">
                <h3>2. Choose Crust</h3>
                <div className="option-grid">
                  {Object.keys(prices.crust).map(crust => (
                    <button
                      key={crust}
                      className={`option-btn ${pizza.crust === crust ? 'active' : ''}`}
                      onClick={() => setPizza({ ...pizza, crust })}
                    >
                      <span className="option-name">{crust}</span>
                      <span className="option-price">
                        {prices.crust[crust] > 0 ? `+$${prices.crust[crust]}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-section">
                <h3>3. Choose Sauce</h3>
                <div className="option-grid">
                  {Object.keys(prices.sauce).map(sauce => (
                    <button
                      key={sauce}
                      className={`option-btn ${pizza.sauce === sauce ? 'active' : ''}`}
                      onClick={() => setPizza({ ...pizza, sauce })}
                    >
                      <span className="option-name">{sauce}</span>
                      <span className="option-price">
                        {prices.sauce[sauce] > 0 ? `+$${prices.sauce[sauce]}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-section">
                <h3>4. Choose Cheese</h3>
                <div className="option-grid">
                  {Object.keys(prices.cheese).map(cheese => (
                    <button
                      key={cheese}
                      className={`option-btn ${pizza.cheese === cheese ? 'active' : ''}`}
                      onClick={() => setPizza({ ...pizza, cheese })}
                    >
                      <span className="option-name">{cheese}</span>
                      <span className="option-price">
                        {prices.cheese[cheese] > 0 ? `+$${prices.cheese[cheese]}` : 'Free'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-section">
                <h3>5. Add Toppings</h3>
                <p className="topping-note">Each topping: ${prices.topping}</p>
                <div className="toppings-grid">
                  {toppings.map(topping => (
                    <button
                      key={topping}
                      className={`topping-btn ${pizza.toppings.includes(topping) ? 'active' : ''}`}
                      onClick={() => toggleTopping(topping)}
                    >
                      {topping}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pizza-preview">
              <div className="preview-card card">
                <h3>Your Pizza</h3>
                <div className="pizza-visual">
                  <div className="pizza-base">
                    <div className="pizza-sauce"></div>
                    <div className="pizza-cheese"></div>
                    {pizza.toppings.map((topping, idx) => (
                      <div key={idx} className="topping-dot" style={{
                        top: `${20 + (idx * 15) % 60}%`,
                        left: `${20 + (idx * 25) % 60}%`
                      }}>
                        {topping.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="preview-details">
                  <div className="detail-row">
                    <span>Size:</span>
                    <strong>{pizza.size}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Crust:</span>
                    <strong>{pizza.crust}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Sauce:</span>
                    <strong>{pizza.sauce}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Cheese:</span>
                    <strong>{pizza.cheese}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Toppings:</span>
                    <strong>{pizza.toppings.length}</strong>
                  </div>
                </div>

                <div className="preview-price">
                  <span>Total Price:</span>
                  <span className="price-value">${calculatePrice()}</span>
                </div>

                <button className="btn-primary full-width" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && <Toast message="Custom pizza added to cart!" />}
    </>
  )
}

export default PizzaBuilder
