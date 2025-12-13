const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = new Map();
const children = new Map();
const locations = new Map();
const alerts = new Map();
const geofences = new Map();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'KidSafe API is running' });
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, role } = req.body;
  
  if (users.has(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    email,
    name,
    role: role || 'parent',
    createdAt: new Date()
  };
  
  users.set(email, user);
  res.json({ user, token: 'mock-jwt-token-' + user.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ user, token: 'mock-jwt-token-' + user.id });
});

// Child profile routes
app.post('/api/children', (req, res) => {
  const { name, age, parentId } = req.body;
  
  const child = {
    id: Date.now().toString(),
    name,
    age,
    parentId,
    createdAt: new Date(),
    lastLocation: null,
    lastCheckIn: null
  };
  
  children.set(child.id, child);
  res.json(child);
});

app.get('/api/children/:parentId', (req, res) => {
  const parentChildren = Array.from(children.values())
    .filter(child => child.parentId === req.params.parentId);
  res.json(parentChildren);
});

// Location tracking routes
app.post('/api/location', (req, res) => {
  const { childId, latitude, longitude, accuracy } = req.body;
  
  const location = {
    id: Date.now().toString(),
    childId,
    latitude,
    longitude,
    accuracy,
    timestamp: new Date()
  };
  
  if (!locations.has(childId)) {
    locations.set(childId, []);
  }
  locations.get(childId).push(location);
  
  // Update child's last location
  const child = children.get(childId);
  if (child) {
    child.lastLocation = location;
    children.set(childId, child);
  }
  
  // Emit real-time update
  io.emit('location-update', { childId, location });
  
  res.json(location);
});

app.get('/api/location/:childId', (req, res) => {
  const childLocations = locations.get(req.params.childId) || [];
  res.json(childLocations.slice(-100)); // Last 100 locations
});

app.get('/api/location/:childId/current', (req, res) => {
  const child = children.get(req.params.childId);
  if (!child || !child.lastLocation) {
    return res.status(404).json({ error: 'No location found' });
  }
  res.json(child.lastLocation);
});

// Geofence routes
app.post('/api/geofences', (req, res) => {
  const { childId, name, latitude, longitude, radius } = req.body;
  
  const geofence = {
    id: Date.now().toString(),
    childId,
    name,
    latitude,
    longitude,
    radius,
    createdAt: new Date()
  };
  
  if (!geofences.has(childId)) {
    geofences.set(childId, []);
  }
  geofences.get(childId).push(geofence);
  
  res.json(geofence);
});

app.get('/api/geofences/:childId', (req, res) => {
  const childGeofences = geofences.get(req.params.childId) || [];
  res.json(childGeofences);
});

// Alert routes
app.post('/api/alerts', (req, res) => {
  const { childId, type, level, message, location } = req.body;
  
  const alert = {
    id: Date.now().toString(),
    childId,
    type,
    level,
    message,
    location,
    timestamp: new Date(),
    acknowledged: false
  };
  
  if (!alerts.has(childId)) {
    alerts.set(childId, []);
  }
  alerts.get(childId).push(alert);
  
  // Emit real-time alert
  io.emit('alert', alert);
  
  res.json(alert);
});

app.get('/api/alerts/:childId', (req, res) => {
  const childAlerts = alerts.get(req.params.childId) || [];
  res.json(childAlerts.slice(-50)); // Last 50 alerts
});

app.patch('/api/alerts/:alertId/acknowledge', (req, res) => {
  let found = false;
  for (const [childId, childAlerts] of alerts.entries()) {
    const alert = childAlerts.find(a => a.id === req.params.alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
      found = true;
      res.json(alert);
      break;
    }
  }
  if (!found) {
    res.status(404).json({ error: 'Alert not found' });
  }
});

// Check-in routes
app.post('/api/checkin', (req, res) => {
  const { childId, location } = req.body;
  
  const child = children.get(childId);
  if (!child) {
    return res.status(404).json({ error: 'Child not found' });
  }
  
  child.lastCheckIn = {
    timestamp: new Date(),
    location
  };
  children.set(childId, child);
  
  // Create info alert
  const alert = {
    id: Date.now().toString(),
    childId,
    type: 'check-in',
    level: 'info',
    message: `${child.name} checked in`,
    location,
    timestamp: new Date(),
    acknowledged: false
  };
  
  if (!alerts.has(childId)) {
    alerts.set(childId, []);
  }
  alerts.get(childId).push(alert);
  
  io.emit('checkin', { childId, checkIn: child.lastCheckIn });
  
  res.json(child.lastCheckIn);
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-parent', (parentId) => {
    socket.join(`parent-${parentId}`);
    console.log(`Parent ${parentId} joined`);
  });
  
  socket.on('join-child', (childId) => {
    socket.join(`child-${childId}`);
    console.log(`Child ${childId} joined`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`KidSafe server running on port ${PORT}`);
});
