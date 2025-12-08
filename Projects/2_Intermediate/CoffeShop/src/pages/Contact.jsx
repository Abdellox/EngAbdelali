import React, { useState } from 'react'
import { showToast } from '../components/Toast'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact container">
      <h1>Get In Touch</h1>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card card">
            <div className="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Coffee Street</p>
            <p>Brewtown, CA 90210</p>
          </div>

          <div className="info-card card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>(555) 123-4567</p>
            <p>Mon-Fri: 6AM - 8PM</p>
          </div>

          <div className="info-card card">
            <div className="info-icon">✉️</div>
            <h3>Email Us</h3>
            <p>hello@coffeebliss.com</p>
            <p>support@coffeebliss.com</p>
          </div>

          <div className="info-card card">
            <div className="info-icon">⏰</div>
            <h3>Hours</h3>
            <p>Mon-Fri: 6:00 AM - 8:00 PM</p>
            <p>Sat-Sun: 7:00 AM - 9:00 PM</p>
          </div>

          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-btn">📷 Instagram</a>
              <a href="#" className="social-btn">📘 Facebook</a>
              <a href="#" className="social-btn">🐦 Twitter</a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-card card">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div className="map-section">
        <div className="map-placeholder">
          <div className="map-icon">🗺️</div>
          <p>123 Coffee Street, Brewtown, CA 90210</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
