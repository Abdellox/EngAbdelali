# TechStore - E-commerce Platform

A full-stack e-commerce website for electronics with admin dashboard.

## Features

### Customer Features
- Fully responsive design (mobile, tablet, desktop)
- Browse products by category
- Product search and filtering
- Shopping cart functionality
- Product ratings and reviews
- Special deals and offers

### Admin Features
- Secure admin login
- Dashboard with statistics
- Full product management (Create, Read, Update, Delete)
- Category management
- Order management with status updates
- Real-time inventory tracking

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Responsive design

**Backend:**
- Node.js
- Express.js
- JWT authentication
- bcrypt for password hashing

## Installation

1. **Install Node.js** (if not already installed)
   Download from: https://nodejs.org/

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Edit the `.env` file to change default credentials:
   ```
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ADMIN_EMAIL=admin@techstore.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Usage

### Access the Website
- Main website: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

### Default Admin Credentials
- Email: `admin@techstore.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change these credentials in production!**

## Admin Dashboard Guide

### Login
1. Go to http://localhost:3000/admin
2. Enter admin credentials
3. Click "Login"

### Managing Products
1. Click "Products" in sidebar
2. Click "Add Product" to create new product
3. Fill in product details:
   - Name, description, category
   - Price, old price (for sales)
   - Stock quantity
   - Image URL
   - Badge (Hot, New, Sale, etc.)
   - Rating
4. Click "Edit" to modify existing products
5. Click "Delete" to remove products

### Managing Categories
1. Click "Categories" in sidebar
2. Click "Add Category" to create new category
3. Enter category name, description, and icon
4. Use FontAwesome icon classes (e.g., fa-mobile-alt)

### Managing Orders
1. Click "Orders" in sidebar
2. View all customer orders
3. Update order status using dropdown:
   - Pending
   - Processing
   - Shipped
   - Delivered
   - Cancelled
4. Delete orders if needed

### Dashboard Overview
- View total products, orders, revenue
- See pending orders count
- Check recent orders

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

### Statistics
- `GET /api/stats` - Get dashboard statistics (admin only)

## Database

Currently uses in-memory storage (data resets on server restart).

For production, integrate with:
- MongoDB
- PostgreSQL
- MySQL

## Security Notes

1. Change default admin credentials
2. Use strong JWT_SECRET in production
3. Enable HTTPS in production
4. Add rate limiting
5. Implement input validation
6. Add CSRF protection
7. Use environment variables for sensitive data

## Customization

### Adding New Products
Use the admin dashboard or directly modify `database.js`

### Changing Colors
Edit CSS variables in `styles.css` and `admin-styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* ... */
}
```

### Adding Payment Integration
Integrate with:
- Stripe
- PayPal
- Square

## Troubleshooting

**Server won't start:**
- Check if port 3000 is available
- Run `npm install` again
- Check Node.js version (v14+ required)

**Can't login to admin:**
- Check credentials in `.env` file
- Clear browser cache and localStorage
- Check browser console for errors

**Products not loading:**
- Ensure server is running
- Check browser console for API errors
- Verify API_URL in `script.js` and `admin-script.js`

## License

MIT License - Feel free to use for personal or commercial projects.

## Support

For issues or questions, check the code comments or create an issue.
