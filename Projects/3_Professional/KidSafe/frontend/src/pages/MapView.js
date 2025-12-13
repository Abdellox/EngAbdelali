import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import axios from 'axios';
import Navbar from '../components/Navbar';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView() {
  const [children, setChildren] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [center, setCenter] = useState([37.7749, -122.4194]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [childrenRes, geofencesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/children'),
        axios.get('http://localhost:5000/api/geofences')
      ]);
      
      const childrenData = childrenRes.data;
      setChildren(childrenData);
      setGeofences(geofencesRes.data);

      if (childrenData.length > 0 && childrenData[0].currentLocation) {
        const loc = childrenData[0].currentLocation;
        setCenter([loc.latitude, loc.longitude]);
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="map-container">
        <div className="map-sidebar">
          <h2>Children Locations</h2>
          {children.map(child => (
            <div key={child.id} className="child-location-card">
              <h3>{child.name}</h3>
              {child.currentLocation ? (
                <>
                  <p>📍 Lat: {child.currentLocation.latitude.toFixed(4)}</p>
                  <p>📍 Lng: {child.currentLocation.longitude.toFixed(4)}</p>
                  <p>🔋 Battery: {child.currentLocation.battery}%</p>
                  <p className="location-time">
                    Updated: {new Date(child.currentLocation.timestamp).toLocaleTimeString()}
                  </p>
                </>
              ) : (
                <p className="no-location">No location data</p>
              )}
            </div>
          ))}
        </div>

        <div className="map-view">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {children.map(child => 
              child.currentLocation && (
                <Marker
                  key={child.id}
                  position={[child.currentLocation.latitude, child.currentLocation.longitude]}
                >
                  <Popup>
                    <strong>{child.name}</strong><br />
                    Battery: {child.currentLocation.battery}%<br />
                    {new Date(child.currentLocation.timestamp).toLocaleString()}
                  </Popup>
                </Marker>
              )
            )}

            {geofences.map(fence => (
              <Circle
                key={fence.id}
                center={[fence.latitude, fence.longitude]}
                radius={fence.radius}
                pathOptions={{
                  color: fence.type === 'home' ? 'green' : 'blue',
                  fillColor: fence.type === 'home' ? 'green' : 'blue',
                  fillOpacity: 0.2
                }}
              >
                <Popup>
                  <strong>{fence.name}</strong><br />
                  Type: {fence.type}<br />
                  Radius: {fence.radius}m
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapView;
