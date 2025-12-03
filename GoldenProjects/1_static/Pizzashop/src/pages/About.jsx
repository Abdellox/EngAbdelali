import './About.css'

const About = () => {
  return (
    <div className="about-page fade-in">
      <div className="about-header">
        <div className="container">
          <h1>About Pizza Palace</h1>
          <p>Our Story, Our Passion, Our Pizza</p>
        </div>
      </div>

      <div className="container">
        <section className="story-section">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                At Pizza Palace, every pizza is handcrafted using fresh dough, premium toppings, 
                and recipes passed down for generations. Founded in 1985, we've been serving our 
                community with authentic Italian flavors and a commitment to quality that never wavers.
              </p>
              <p>
                What started as a small family pizzeria has grown into a beloved local institution, 
                but our values remain the same: fresh ingredients, traditional methods, and a passion 
                for creating the perfect pizza every single time.
              </p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600" alt="Pizza making" />
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card card">
              <div className="value-icon">🌱</div>
              <h3>Fresh & Local</h3>
              <p>We source our ingredients from local farms and suppliers, ensuring the freshest flavors in every bite.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">👨‍🍳</div>
              <h3>Handcrafted</h3>
              <p>Every pizza is made by hand with care and attention to detail by our skilled pizza chefs.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">❤️</div>
              <h3>Community First</h3>
              <p>We're proud to be part of this community and give back through local partnerships and events.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet Our Chefs</h2>
          <div className="team-grid">
            <div className="chef-card card">
              <div className="chef-image">👨‍🍳</div>
              <h3>Marco Rossi</h3>
              <p className="chef-title">Head Chef</p>
              <p>30 years of experience crafting authentic Italian pizzas</p>
            </div>
            <div className="chef-card card">
              <div className="chef-image">👩‍🍳</div>
              <h3>Sofia Martinez</h3>
              <p className="chef-title">Pastry Chef</p>
              <p>Specializes in our signature desserts and dough recipes</p>
            </div>
            <div className="chef-card card">
              <div className="chef-image">👨‍🍳</div>
              <h3>Antonio Bianchi</h3>
              <p className="chef-title">Pizza Master</p>
              <p>Expert in traditional wood-fired pizza techniques</p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Best pizza in town! The crust is perfect and the toppings are always fresh. Been coming here for years!"</p>
              <p className="customer-name">- Sarah Johnson</p>
            </div>
            <div className="testimonial-card card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"The custom pizza builder is amazing. I can create exactly what I want every time. Delivery is always fast too!"</p>
              <p className="customer-name">- Mike Chen</p>
            </div>
            <div className="testimonial-card card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Family-owned quality you can taste. The BBQ Chicken Delight is my absolute favorite!"</p>
              <p className="customer-name">- Emily Rodriguez</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
