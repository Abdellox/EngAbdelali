import { Link } from 'react-router-dom'
import { countries, regions } from '../data/countries'
import { useState } from 'react'

function Countries({ searchQuery }) {
  const [selectedRegion, setSelectedRegion] = useState('all')

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <div className="container">
      <h1>Explore Countries</h1>
      
      <div className="section">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button 
            className={`btn ${selectedRegion === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedRegion('all')}
          >
            All Regions
          </button>
          {Object.entries(regions).map(([key, region]) => (
            <button
              key={key}
              className={`btn ${selectedRegion === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedRegion(key)}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div className="country-grid">
          {filteredCountries.map(country => (
            <Link key={country.id} to={`/country/${country.id}`} className="country-card">
              <div className="flag">{country.flag}</div>
              <h3>{country.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                {regions[country.region].name}
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                View Cuisine
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Countries
