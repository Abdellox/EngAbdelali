import React from 'react'
import './About.css'

const About = () => {
  const values = [
    { icon: '🌱', title: 'Sustainability', description: 'We source our beans from ethical, sustainable farms that care for the environment.' },
    { icon: '❤️', title: 'Community', description: 'Building connections one cup at a time, creating a welcoming space for all.' },
    { icon: '✨', title: 'Quality', description: 'Every drink is crafted with precision and passion by our expert baristas.' },
    { icon: '🌍', title: 'Fair Trade', description: 'Supporting farmers worldwide with fair wages and ethical practices.' }
  ]

  const team = [
    { name: 'Sarah Chen', role: 'Head Barista', photo: '👩‍🍳', bio: '10 years of coffee expertise and latte art champion' },
    { name: 'Marcus Johnson', role: 'Coffee Roaster', photo: '👨‍🍳', bio: 'Master roaster with a passion for perfect beans' },
    { name: 'Emma Rodriguez', role: 'Pastry Chef', photo: '👩‍🍳', bio: 'Creating delicious treats to pair with your coffee' },
    { name: 'David Kim', role: 'Manager', photo: '👨‍💼', bio: 'Ensuring every visit is a memorable experience' }
  ]

  return (
    <div className="about container">
      <h1>About Coffee Bliss</h1>

      <div className="about-hero">
        <h2>Our Story</h2>
        <p>
          At Coffee Bliss, every cup is a handcrafted moment designed to bring warmth and connection to your day.
          Founded in 2015, we've been serving our community with passion, quality, and a commitment to excellence.
        </p>
      </div>

      <div className="story-section">
        <div className="story-image">☕</div>
        <div className="story-content">
          <h2>Where It All Began</h2>
          <p>
            Coffee Bliss started as a small neighborhood café with a simple mission: to serve exceptional coffee
            in a warm, welcoming environment. What began as a dream has grown into a beloved community gathering place.
          </p>
          <p>
            We believe that coffee is more than just a beverage—it's an experience, a ritual, and a way to connect
            with others. Every bean is carefully selected, every drink is thoughtfully prepared, and every customer
            is treated like family.
          </p>
        </div>
      </div>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card card">
              <div className="team-photo">{member.photo}</div>
              <h3>{member.name}</h3>
              <div className="team-role">{member.role}</div>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
