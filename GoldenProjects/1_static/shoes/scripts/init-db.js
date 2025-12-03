const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
    { name: 'Air Max Pro', category: 'sneakers', price: 129.99, rating: 5, badge: 'New', stock: 50, description: 'Premium air cushioned sneakers' },
    { name: 'Classic Oxford', category: 'formal', price: 89.99, rating: 4, badge: '', stock: 30, description: 'Elegant formal shoes' },
    { name: 'Running Elite', category: 'sports', price: 149.99, rating: 5, badge: 'Hot', stock: 40, description: 'Professional running shoes' },
    { name: 'Casual Loafer', category: 'casual', price: 69.99, rating: 4, badge: '', stock: 60, description: 'Comfortable casual wear' },
    { name: 'Street Sneaker', category: 'sneakers', price: 99.99, rating: 5, badge: 'Sale', stock: 45, description: 'Urban street style' },
    { name: 'Derby Dress', category: 'formal', price: 119.99, rating: 4, badge: '', stock: 25, description: 'Classic derby shoes' },
    { name: 'Trail Runner', category: 'sports', price: 139.99, rating: 5, badge: 'New', stock: 35, description: 'All-terrain running shoes' },
    { name: 'Canvas Slip-On', category: 'casual', price: 59.99, rating: 4, badge: '', stock: 70, description: 'Easy slip-on canvas shoes' },
    { name: 'High Top Sneaker', category: 'sneakers', price: 109.99, rating: 5, badge: '', stock: 55, description: 'Classic high-top design' },
    { name: 'Leather Brogue', category: 'formal', price: 159.99, rating: 5, badge: 'Premium', stock: 20, description: 'Handcrafted leather brogues' },
    { name: 'Basketball Pro', category: 'sports', price: 169.99, rating: 5, badge: 'Hot', stock: 30, description: 'Professional basketball shoes' },
    { name: 'Boat Shoe', category: 'casual', price: 79.99, rating: 4, badge: '', stock: 50, description: 'Classic boat shoes' }
];

async function initDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/solestyle');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
        const admin = new User({
            email: process.env.ADMIN_EMAIL || 'admin@solestyle.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created');

        // Create products
        await Product.insertMany(products);
        console.log('Products created');

        console.log('\n✅ Database initialized successfully!');
        console.log('\nAdmin Credentials:');
        console.log('Email:', process.env.ADMIN_EMAIL || 'admin@solestyle.com');
        console.log('Password:', process.env.ADMIN_PASSWORD || 'admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase();
