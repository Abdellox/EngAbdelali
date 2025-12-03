# SoleStyle - Shoe Store with Admin Dashboard

A complete e-commerce shoe store with a powerful admin dashboard for managing products, orders, and customers.

## Features

### Customer Store
- Responsive design for all devices
- Product filtering by category
- Shopping cart functionality
- Smooth animations and transitions
- Contact form

### Admin Dashboard
- Secure login system
- Dashboard with statistics
- Product management (CRUD operations)
- Order management
- Customer management
- Real-time updates

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
Edit the `.env` file with your settings:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/solestyle
JWT_SECRET=your_jwt_secret_key_change_this_in_production
ADMIN_EMAIL=admin@solestyle.com
ADMIN_PASSWORD=admin123
```

3. **Initialize Database**
```bash
node scripts/init-db.js
```

4. **Start the Server**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Access the Application

- **Store Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

### Default Admin Credentials
- Email: admin@solestyle.com
- Password: admin123

**⚠️ Change these credentials in production!**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Customers
- `GET /api/customers` - Get all customers (Admin)

### Statistics
- `GET /api/stats` - Get dashboard statistics (Admin)

## Project Structure

```
solestyle-store/
├── models/              # Database models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/              # API routes
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── customers.js
│   └── stats.js
├── middleware/          # Custom middleware
│   └── auth.js
├── public/              # Frontend files
│   ├── index.html       # Store frontend
│   ├── style.css
│   ├── script.js
│   ├── admin.html       # Admin dashboard
│   ├── admin.css
│   └── admin.js
├── scripts/             # Utility scripts
│   └── init-db.js
├── server.js            # Main server file
├── package.json
├── .env                 # Environment variables
└── README.md
```

## Features in Detail

### Admin Dashboard
- **Overview Page:** View total revenue, orders, products, and customers
- **Products Management:** Add, edit, delete products with full details
- **Orders Management:** View and manage customer orders
- **Customers Management:** View registered customers
- **Responsive Design:** Works on desktop and mobile

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- CORS enabled

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```

## Production Deployment

1. Set strong JWT_SECRET in .env
2. Change default admin credentials
3. Use MongoDB Atlas for database
4. Set NODE_ENV=production
5. Use a process manager like PM2

## License

ISC

## Support

For issues or questions, please open an issue on the repository.
