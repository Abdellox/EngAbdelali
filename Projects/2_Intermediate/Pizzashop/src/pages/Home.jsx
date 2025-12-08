import { Link } from 'react-router-dom'
import { pizzas } from '../data/menuData'
import PizzaCard from '../components/PizzaCard'
import './Home.css'

const Home = () => {
  const featuredPizza = pizzas[1] // BBQ Chicken Delight

  return (
    <div className="home fade-in">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Fresh. Hot. Handcrafted.</h1>
          <p className="hero-subtitle">Every Slice Matters.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn-primary">Order Now</Link>
            <Link to="/deals" className="btn-secondary">See Today's Deals</Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">🔥 Featured Pizza of the Day</h2>
          <div className="featured-pizza">
            <img src={featuredPizza.image} alt={featuredPizza.name} className="featured-image" />
            <div className="featured-info">
              <h3>{featuredPizza.name}</h3>
              <p>{featuredPizza.description}</p>
              <p className="featured-price">Starting at ${featuredPizza.price.S}</p>
              <Link to="/menu" className="btn-primary">Order Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="top-sellers">
        <div className="container">
          <h2 className="section-title">🍕 Top Selling Pizzas</h2>
          <div className="pizza-grid">
            {pizzas.slice(0, 4).map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest, locally-sourced ingredients</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Hot pizza delivered to your door in 30 minutes or less</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Authentic Recipes</h3>
              <p>Traditional Italian recipes passed down for generations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
