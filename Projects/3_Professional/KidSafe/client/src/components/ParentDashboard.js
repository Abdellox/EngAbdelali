import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ParentDashboard.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ParentDashboard({ user, onLogout }) {
  const [children, setChildren] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showAddGeofence, setShowAddGeofence] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [newChild, setNewChild] = useState({ name: '', age: '' });
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    latitude: '',
    longitude: '',
    radius: 500
  });

  useEffect(() => {
    // Load demo data
    const demoChildren = [
      {
        id: '1',
        name: 'Emma',
        age: 10,
        parentId: user.id,
        lastLocation: {
          latitude: 40.7128,
          longitude: -74.0060,
          timestamp: new Date()
        },
        lastCheckIn: {
          timestamp: new Date(Date.now() - 1800000) // 30 min ago
        }
      },
      {
        id: '2',
        name: 'Noah',
        age: 8,
        parentId: user.id,
        lastLocation: {
          latitude: 40.7580,
          longitude: -73.9855,
          timestamp: new Date()
        },
        lastCheckIn: {
          timestamp: new Date(Date.now() - 600000) // 10 min ago
        }
      }
    ];
    
    setChildren(demoChildren);
    setSelectedChild(demoChildren[0]);
    
    // Demo alerts
    setAlerts([
      {
        id: '1',
        childId: '1',
        type: 'check-in',
        level: 'info',
        message: 'Emma checked in at school',
        timestamp: new Date(Date.now() - 1800000),
        acknowledged: false
      },
      {
        id: '2',
        childId: '2',
        type: 'arrival',
        level: 'info',
        message: 'Noah arrived at home',
        timestamp: new Date(Date.now() - 600000),
        acknowledged: false
      }
    ]);
  }, [user.id]);

  const handleAddChild = (e) => {
    e.preventDefault();
    const child = {
      id: Date.now().toString(),
      ...newChild,
      parentId: user.id,
      lastLocation: null,
      lastCheckIn: null
    };
    setChildren([...children, child]);
    setNewChild({ name: '', age: '' });
    setShowAddChild(false);
  };

  const handleAddGeofence = (e) => {
    e.preventDefault();
    alert(`Geofence "${newGeofence.name}" created for ${selectedChild.name}`);
    setNewGeofence({ name: '', latitude: '', longitude: '', radius: 500 });
    setShowAddGeofence(false);
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getTimeSince = (timestamp) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="parent-dashboard">
      <div className="header">
        <div className="header-content">
          <h1>🛡️ KidSafe</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user.name}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-grid">
          {/* Children Overview */}
          <div className="card children-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>My Children</h2>
              <button onClick={() => setShowAddChild(!showAddChild)} className="primary-btn">
                + Add Child
              </button>
            </div>
            
            {showAddChild && (
              <form onSubmit={handleAddChild} className="add-form">
                <input
                  type="text"
                  placeholder="Child's name"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={newChild.age}
                  onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                  required
                />
                <button type="submit" className="primary-btn">Add</button>
              </form>
            )}
            
            {children.map(child => (
              <div 
                key={child.id} 
                className={`child-card ${selectedChild?.id === child.id ? 'selected' : ''}`}
                onClick={() => setSelectedChild(child)}
              >
                <h3>{child.name}, {child.age}</h3>
                <div className="location-info">
                  {child.lastLocation ? (
                    <>
                      <p>📍 Last seen: {getTimeSince(child.lastLocation.timestamp)}</p>
                      <p>✅ Last check-in: {child.lastCheckIn ? getTimeSince(child.lastCheckIn.timestamp) : 'Never'}</p>
                    </>
                  ) : (
                    <p>No location data</p>
                  )}
                </div>
                <span className={`status-badge ${child.lastCheckIn && (Date.now() - new Date(child.lastCheckIn.timestamp)) < 3600000 ? 'status-safe' : 'status-warning'}`}>
                  {child.lastCheckIn && (Date.now() - new Date(child.lastCheckIn.timestamp)) < 3600000 ? 'Safe' : 'Check-in needed'}
                </span>
              </div>
            ))}
            
            {children.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">👶</div>
                <p>No children added yet</p>
              </div>
            )}
          </div>

          {/* Map View */}
          <div className="card map-section">
            <h2>Live Location</h2>
            {selectedChild && selectedChild.lastLocation ? (
              <div className="map-container">
                <MapContainer
                  center={[selectedChild.lastLocation.latitude, selectedChild.lastLocation.longitude]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[selectedChild.lastLocation.latitude, selectedChild.lastLocation.longitude]}>
                    <Popup>{selectedChild.name}'s location</Popup>
                  </Marker>
                  <Circle
                    center={[selectedChild.lastLocation.latitude, selectedChild.lastLocation.longitude]}
                    radius={500}
                    pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.1 }}
                  />
                </MapContainer>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🗺️</div>
                <p>Select a child to view location</p>
              </div>
            )}
            
            {selectedChild && (
              <div style={{ marginTop: '15px' }}>
                <button onClick={() => setShowAddGeofence(!showAddGeofence)} className="secondary-btn">
                  + Add Safe Zone
                </button>
                
                {showAddGeofence && (
                  <form onSubmit={handleAddGeofence} className="add-form" style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder="Zone name (e.g., School)"
                      value={newGeofence.name}
                      onChange={(e) => setNewGeofence({ ...newGeofence, name: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      value={newGeofence.latitude}
                      onChange={(e) => setNewGeofence({ ...newGeofence, latitude: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      value={newGeofence.longitude}
                      onChange={(e) => setNewGeofence({ ...newGeofence, longitude: e.target.value })}
                      required
                    />
                    <button type="submit" className="primary-btn">Create Zone</button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Alerts */}
          <div className="card alerts-section">
            <h2>Recent Alerts</h2>
            {alerts.filter(a => !a.acknowledged).length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">✅</div>
                <p>No new alerts</p>
              </div>
            ) : (
              alerts.filter(a => !a.acknowledged).map(alert => (
                <div key={alert.id} className={`alert alert-${alert.level}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{alert.message}</strong>
                      <p style={{ fontSize: '12px', marginTop: '5px' }}>
                        {getTimeSince(alert.timestamp)}
                      </p>
                    </div>
                    <button 
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="primary-btn"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      ✓
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="card actions-section">
            <h2>Quick Actions</h2>
            {selectedChild ? (
              <div className="action-buttons">
                <button className="secondary-btn" style={{ width: '100%', marginBottom: '10px' }}>
                  📞 Call {selectedChild.name}
                </button>
                <button className="secondary-btn" style={{ width: '100%', marginBottom: '10px' }}>
                  💬 Send Message
                </button>
                <button className="secondary-btn" style={{ width: '100%', marginBottom: '10px' }}>
                  📊 View Activity Report
                </button>
                <button className="secondary-btn" style={{ width: '100%' }}>
                  ⚙️ Manage Settings
                </button>
              </div>
            ) : (
              <p style={{ color: '#999' }}>Select a child to see actions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
