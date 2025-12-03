# Parfum Collection Store

A fully responsive perfume e-commerce website with complete admin dashboard.

## Features

### Customer Store (index.html)
- Modern, responsive design
- Product filtering by category (Men, Women, Unisex)
- Shopping cart with localStorage persistence
- Smooth animations and transitions
- Contact form
- Mobile-friendly navigation

### Admin Dashboard (admin.html)
- Secure login system
- Full product management (Add, Edit, Delete)
- Orders tracking and management
- Customer management
- Statistics overview
- Responsive admin panel

## Login Credentials

**Admin Panel Access:**
- Username: `admin`
- Password: `admin123`

## How to Use

1. Open `index.html` in your browser to view the store
2. Click "Admin" in the navigation or open `admin.html` directly
3. Login with the credentials above
4. Manage products, orders, and customers from the dashboard

## Admin Features

### Products Management
- Add new products with name, category, price, description, and icon
- Edit existing products
- Delete products
- Changes sync automatically with the main store

### Orders Management
- View all customer orders
- Update order status (Completed/Cancelled)
- Track revenue and order statistics

### Dashboard Overview
- Total revenue statistics
- Total orders count
- Total products count
- Total customers count
- Recent orders table

### Settings
- Update store information
- Change admin password
- Configure store settings

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- LocalStorage for data persistence
- Font Awesome icons

## File Structure

```
├── index.html          # Main store page
├── styles.css          # Store styles
├── script.js           # Store functionality
├── admin.html          # Admin dashboard
├── admin.css           # Admin styles
├── admin.js            # Admin functionality
└── README.md           # Documentation
```

## Notes

- All data is stored in browser localStorage
- Products added/edited in admin panel automatically appear in the store
- For production use, implement proper backend authentication and database
- Sample orders and customers are generated for demo purposes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

Enjoy managing your perfume collection store!
