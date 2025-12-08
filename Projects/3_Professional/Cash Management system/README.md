# Business Management System

Complete web-based management system for restaurants and service businesses.

## Features

✅ **Smart POS System** - Real-time sales tracking, receipt generation, shift management
✅ **Inventory Management** - Track stock, ingredients, waste, auto-alerts
✅ **Expense Tracking** - Record all expenses, profit/loss reports
✅ **Cash Drawer Security** - Audit logs, variance detection
✅ **Staff Management** - User roles, permissions, performance tracking
✅ **Multi-Branch Support** - Manage multiple locations from one dashboard
✅ **Digital Payments** - Support for cards, wallets, QR payments
✅ **Real-Time Analytics** - Sales reports, best sellers, peak hours
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your database
3. Install dependencies:
   ```
   npm run install-all
   ```
4. Set up the database (see database/schema.sql)
5. Start the application:
   ```
   npm run dev
   ```

## Default Access

- **Admin**: admin@business.com / admin123
- **Manager**: manager@business.com / manager123
- **Cashier**: cashier@business.com / cashier123

## Tech Stack

- Frontend: React, Material-UI, Chart.js
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: JWT
