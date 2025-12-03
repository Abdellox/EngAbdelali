import React from 'react'
import { Link } from 'react-router-dom'
import { menuItems } from '../data/menuData'
import './Home.css'

const Home = () => {
  const topSellers = menuItems.filter(item => item.badge === 'popular').slice(0, 4)
  const featured = menuItems[3] // Caramel Honey Cold Brew

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Brewed with Passion, Served with Love</h1>
          <p>Experience the finest coffee crafted by expert baristas</p>
          <div className="hero-buttons">
            <Link to="/specials" className="btn-primary">View Specials</Link>
            <Link to="/menu" className="btn-secondary">Order Now</Link>
          </div>
        </div>
        <div className="hero-image">☕</div>
      </section>

      <section className="featured container">
        <div className="featured-card">
          <div className="featured-badge">Today's Featured</div>
          <div className="featured-content">
            <div className="featured-image">{featured.image}</div>
            <div className="featured-info">
              <h2>{featured.name}</h2>
              <p>{featured.description}</p>
              <div className="featured-price">${featured.price.toFixed(2)}</div>
              <Link to="/menu" className="btn-primary">Order Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="top-sellers container">
        <h2>Top Sellers</h2>
        <div className="carousel">
          {topSellers.map(item => (
            <div key={item.id} className="carousel-card card">
              <div className="carousel-image">{item.image}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="carousel-footer">
                <span className="price">${item.price.toFixed(2)}</span>
                <Link to="/menu" className="btn-secondary">Order</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Build Your Perfect Drink</h2>
          <p>Customize every detail to match your taste</p>
          <Link to="/drink-builder" className="btn-primary">Start Creating</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
