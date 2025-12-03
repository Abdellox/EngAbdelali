function About() {
  return (
    <div className="container">
      <h1>About WorldBite</h1>
      
      <div className="section">
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 3px 10px var(--shadow)' }}>
          <h2>🌍 Our Mission</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            WorldBite is dedicated to celebrating the incredible diversity of global cuisine. 
            We believe that food is more than sustenance—it's culture, history, and connection. 
            Through our platform, we aim to educate and inspire people to explore the world's 
            culinary traditions, one dish at a time.
          </p>
        </div>
      </div>

      <div className="section">
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 3px 10px var(--shadow)' }}>
          <h2>🍽️ Why Global Cuisine Matters</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>Food tells the story of a culture's history and values</li>
            <li>Culinary traditions connect us across borders</li>
            <li>Understanding food helps us appreciate diversity</li>
            <li>Every dish has a story worth sharing</li>
            <li>Food brings people together in celebration</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 3px 10px var(--shadow)' }}>
          <h2>📚 How We Curate</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Our database features carefully selected iconic dishes and drinks from countries 
            around the world. We focus on foods that are culturally significant, widely 
            recognized, and representative of each nation's culinary identity. Our content 
            is researched and presented with respect for cultural authenticity.
          </p>
        </div>
      </div>

      <div className="section">
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: '0 3px 10px var(--shadow)' }}>
          <h2>🤝 Cultural Sensitivity</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            We approach every cuisine with respect and cultural sensitivity. Food is deeply 
            personal and tied to identity. We strive to present dishes authentically and 
            acknowledge that regional variations exist. If you notice any inaccuracies or 
            have suggestions, we welcome your feedback.
          </p>
        </div>
      </div>

      <div className="section" style={{ textAlign: 'center' }}>
        <h2>Start Your Culinary Journey</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
          Explore cuisines from over 200 countries and discover your next favorite dish
        </p>
        <div className="hero" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌍🍽️🥘🍜🍕🍣🌮</div>
          <p style={{ fontSize: '1.2rem' }}>
            "The world is a book, and those who do not travel read only one page."
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem' }}>
            - Saint Augustine
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
