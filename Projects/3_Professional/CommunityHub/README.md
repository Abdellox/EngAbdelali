# Reddit Clone - Full Stack Application

A complete Reddit-like community discussion platform built with modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Socket.io Client** for real-time features
- **React Hook Form** for form handling
- **React Markdown** for content rendering

### Backend
- **Node.js** with TypeScript
- **Express.js** REST API
- **Socket.io** for real-time communication
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **bcrypt** for password hashing

## ✨ Features

### Core Features
- **User Authentication** - Register, login, JWT sessions
- **Communities** - Create, join, leave communities with moderation
- **Posts** - Support for text, image, link, and video posts
- **Comments** - Nested threaded comments with real-time updates
- **Voting System** - Upvote/downvote posts and comments
- **Search** - Search posts, communities, and users
- **User Profiles** - Customizable profiles with karma system
- **Real-time Updates** - Live comments, votes, and notifications

### Advanced Features
- **Responsive Design** - Mobile-first approach
- **Hot/New/Top Sorting** - Reddit-style content ranking
- **Markdown Support** - Rich text formatting
- **Real-time Notifications** - Instant updates via WebSocket
- **Moderation Tools** - Community management features
- **Follow System** - Follow users and get updates

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd reddit-clone
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb reddit_clone

# Copy environment file
cd server
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/reddit_clone"
# JWT_SECRET="your-super-secret-jwt-key"

# Generate Prisma client and push schema
npm run db:generate
npm run db:push
```

### 4. Start Development Servers
```bash
# From root directory - starts both client and server
npm run dev

# Or start individually:
# Client (http://localhost:3000)
npm run dev:client

# Server (http://localhost:5000)
npm run dev:server
```

## 📁 Project Structure

```
reddit-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript type definitions
│   └── public/
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── lib/          # Utility libraries
│   │   └── socket.ts     # Socket.io setup
│   └── prisma/
│       └── schema.prisma  # Database schema
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get posts (with filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `POST /api/posts/:id/vote` - Vote on post

### Communities
- `GET /api/communities` - Get all communities
- `GET /api/communities/:name` - Get community by name
- `POST /api/communities` - Create community
- `POST /api/communities/:id/join` - Join community

### Comments
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Create comment
- `POST /api/comments/:id/vote` - Vote on comment

## 🌐 Real-time Features

The application uses Socket.io for real-time functionality:

- **Live Comments** - New comments appear instantly
- **Live Voting** - Vote counts update in real-time
- **Notifications** - Instant notifications for mentions, replies
- **Typing Indicators** - See when users are typing
- **Online Status** - User presence indicators

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

### Database (Supabase)
1. Create Supabase project
2. Copy connection string to `DATABASE_URL`
3. Run migrations: `npm run db:push`

## 🔐 Environment Variables

### Server (.env)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
CLIENT_URL="http://localhost:3000"
PORT=5000
NODE_ENV="development"
```

## 🧪 Development Commands

```bash
# Database
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:migrate    # Run migrations
npm run db:studio     # Open Prisma Studio

# Development
npm run dev           # Start both client and server
npm run dev:client    # Start client only
npm run dev:server    # Start server only

# Build
npm run build         # Build client for production
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Reddit for inspiration
- React and Node.js communities
- All contributors and testers

---

**Happy coding! 🎉**