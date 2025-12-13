const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/addresses', require('./routes/addressRoutes'));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({ message: 'مرحباً بك في منصة التجارة الإلكترونية المغربية' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
