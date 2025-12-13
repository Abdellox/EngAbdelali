# 🛡️ KidSafe - Child Safety Platform

A comprehensive child safety and monitoring platform for busy, full-time working parents.

## Features

### For Parents
- **Real-time Location Tracking** - Monitor your children's location with live GPS updates
- **Geofencing & Safe Zones** - Get alerts when children enter/leave designated areas
- **Emergency Alerts** - Receive immediate notifications in case of emergencies
- **Activity Monitoring** - Track school attendance, tasks, and daily routines
- **Communication Hub** - Message and call your children directly through the app
- **Trusted Helper Network** - Grant access to babysitters, grandparents, and other caregivers

### For Children
- **Safety Check-ins** - Quick "I'm safe" button to notify parents
- **Emergency Button** - One-tap emergency alert to parents and contacts
- **Task Management** - View and complete daily tasks with reward points
- **Schedule View** - See daily activities and routines
- **Parent Communication** - Easy messaging and calling to parents

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
cd client && npm install
cd ..
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- React frontend on http://localhost:3000

### Demo Accounts

**Parent Account:**
- Email: parent@demo.com
- Password: password

**Child Account:**
- Email: child@demo.com
- Password: password

## Technology Stack

### Frontend
- React 18
- React Router for navigation
- Leaflet for maps
- Socket.io for real-time updates

### Backend
- Node.js with Express
- Socket.io for WebSocket connections
- In-memory storage (demo - replace with database)

## Project Structure

```
kidsafe-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Node.js backend
│   └── index.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Children
- `POST /api/children` - Add child profile
- `GET /api/children/:parentId` - Get parent's children

### Location
- `POST /api/location` - Update child location
- `GET /api/location/:childId` - Get location history
- `GET /api/location/:childId/current` - Get current location

### Geofences
- `POST /api/geofences` - Create safe zone
- `GET /api/geofences/:childId` - Get child's geofences

### Alerts
- `POST /api/alerts` - Create alert
- `GET /api/alerts/:childId` - Get child's alerts
- `PATCH /api/alerts/:alertId/acknowledge` - Acknowledge alert

### Check-ins
- `POST /api/checkin` - Child check-in

## Development Roadmap

### Phase 1 (Current - MVP)
- ✅ Basic location tracking
- ✅ Parent and child interfaces
- ✅ Emergency alerts
- ✅ Check-in system
- ✅ Task management

### Phase 2 (Next)
- School integration APIs
- Screen time management
- Content filtering
- Push notifications
- Database integration (MongoDB/PostgreSQL)

### Phase 3 (Future)
- Mobile apps (iOS/Android)
- Advanced AI insights
- Trusted helper network
- Health tracking
- Transportation safety

## Security & Privacy

- All data encrypted in transit (TLS)
- COPPA and GDPR compliant design
- No data selling or third-party sharing
- Parent-controlled privacy settings
- Age-appropriate interfaces

## Contributing

This is a demo project. For production use, implement:
- Proper authentication (JWT, OAuth)
- Database (MongoDB, PostgreSQL)
- Data encryption at rest
- Rate limiting and security headers
- Input validation and sanitization
- Comprehensive error handling
- Unit and integration tests

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, please open an issue on GitHub.

---

**Note:** This is a demonstration project. For production deployment, implement proper security measures, database integration, and compliance with child data protection regulations (COPPA, GDPR, FERPA).
