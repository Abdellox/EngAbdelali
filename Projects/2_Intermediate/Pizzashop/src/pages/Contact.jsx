import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-page fade-in">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>123 Pizza Street</p>
              <p>New York, NY 10001</p>
            </div>

            <div className="info-card card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
              <p>Mon-Sun: 11am - 11pm</p>
            </div>

            <div className="info-card card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>info@pizzapalace.com</p>
              <p>support@pizzapalace.com</p>
            </div>

            <div className="info-card card">
              <div className="info-icon">⏰</div>
              <h3>Opening Hours</h3>
              <p>Monday - Thursday: 11am - 10pm</p>
              <p>Friday - Saturday: 11am - 11pm</p>
              <p>Sunday: 12pm - 10pm</p>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">📘 Facebook</a>
                <a href="#" className="social-icon">📷 Instagram</a>
                <a href="#" className="social-icon">🐦 Twitter</a>
                <a href="#" className="social-icon">📺 YouTube</a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="card">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  <button type="submit" className="btn-primary full-width">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="map-section card">
              <h3>Find Us</h3>
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p>123 Pizza Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="newsletter-section card">
          <h2>📧 Subscribe to Our Newsletter</h2>
          <p>Get exclusive deals, new menu items, and special offers delivered to your inbox!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
