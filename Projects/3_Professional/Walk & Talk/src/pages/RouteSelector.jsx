import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RouteSelector.css';

const routes = [
  { id: 1, name: 'Central Park Loop', type: 'Park', distance: '3.2 km', duration: '45 min', difficulty: 'Easy', lat: 40.785091, lng: -73.968285 },
  { id: 2, name: 'Botanical Garden Trail', type: 'Garden', distance: '2.5 km', duration: '35 min', difficulty: 'Easy', lat: 40.858, lng: -73.878 },
  { id: 3, name: 'Downtown Walk', type: 'City Center', distance: '4.0 km', duration: '55 min', difficulty: 'Medium', lat: 40.758, lng: -73.985 },
  { id: 4, name: 'Riverside Path', type: 'Park', distance: '5.5 km', duration: '75 min', difficulty: 'Medium', lat: 40.795, lng: -73.972 },
  { id: 5, name: 'Historic District', type: 'City Center', distance: '3.8 km', duration: '50 min', difficulty: 'Easy', lat: 40.715, lng: -74.008 },
];

function RouteSelector() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  return (
    <div className="route-selector">
      <div className="container">
        <h1>Choose Your Walking Route</h1>
        
        <div className="route-content">
          <div className="routes-list">
            {routes.map(route => (
              <div 
                key={route.id} 
                className={`route-item ${selectedRoute.id === route.id ? 'active' : ''}`}
                onClick={() => setSelectedRoute(route)}
              >
                <h3>{route.name}</h3>
                <div className="route-type">{route.type}</div>
                <div className="route-details">
                  <span>📏 {route.distance}</span>
                  <span>⏱️ {route.duration}</span>
                  <span>💪 {route.difficulty}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="map-container">
            <MapContainer 
              center={[selectedRoute.lat, selectedRoute.lng]} 
              zoom={13} 
              style={{ height: '100%', width: '100%', borderRadius: '20px' }}
              key={selectedRoute.id}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[selectedRoute.lat, selectedRoute.lng]}>
                <Popup>{selectedRoute.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteSelector;
