const mongoose = require('mongoose');
require('dotenv').config();

const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

const suppliers = [
  {
    name: 'Alibaba Electronics',
    country: 'China',
    website: 'https://www.alibaba.com',
    verified: true,
    rating: 4.5
  },
  {
    name: 'DHgate Wholesale',
    country: 'China',
    website: 'https://www.dhgate.com',
    verified: true,
    rating: 4.3
  },
  {
    name: 'Made-in-China',
    country: 'China',
    website: 'https://www.made-in-china.com',
    verified: true,
    rating: 4.6
  }
];

const products = [
  {
    title: 'Wireless Bluetooth Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 15.99,
    currency: 'USD',
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x300?text=Earbuds'],
    moq: 100,
    specifications: {
      battery: '6 hours',
      bluetooth: '5.0',
      waterproof: 'IPX5'
    }
  },
  {
    title: 'Smart Watch Fitness Tracker',
    description: 'Multi-function smartwatch with heart rate monitor',
    price: 29.99,
    currency: 'USD',
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x300?text=Smart+Watch'],
    moq: 50,
    specifications: {
      display: '1.3 inch',
      battery: '7 days',
      waterproof: 'IP68'
    }
  },
  {
    title: 'USB-C Fast Charging Cable',
    description: 'Durable braided charging cable 2m length',
    price: 3.99,
    currency: 'USD',
    category: 'Accessories',
    images: ['https://via.placeholder.com/300x300?text=USB+Cable'],
    moq: 500
  },
  {
    title: 'Portable Power Bank 20000mAh',
    description: 'High capacity power bank with dual USB ports',
    price: 18.50,
    currency: 'USD',
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x300?text=Power+Bank'],
    moq: 100
  },
  {
    title: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch control',
    price: 12.99,
    currency: 'USD',
    category: 'Home & Office',
    images: ['https://via.placeholder.com/300x300?text=Desk+Lamp'],
    moq: 200
  },
  {
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with 2.4GHz connection',
    price: 8.99,
    currency: 'USD',
    category: 'Computer Accessories',
    images: ['https://via.placeholder.com/300x300?text=Mouse'],
    moq: 300
  },
  {
    title: 'Phone Stand Holder',
    description: 'Adjustable aluminum phone stand for desk',
    price: 6.50,
    currency: 'USD',
    category: 'Accessories',
    images: ['https://via.placeholder.com/300x300?text=Phone+Stand'],
    moq: 500
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker',
    price: 22.99,
    currency: 'USD',
    category: 'Electronics',
    images: ['https://via.placeholder.com/300x300?text=Speaker'],
    moq: 100
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier-platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Supplier.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert suppliers
    const insertedSuppliers = await Supplier.insertMany(suppliers);
    console.log(`Inserted ${insertedSuppliers.length} suppliers`);

    // Add supplier reference to products
    const productsWithSupplier = products.map((product, index) => ({
      ...product,
      supplier: insertedSuppliers[index % insertedSuppliers.length]._id
    }));

    // Insert products
    const insertedProducts = await Product.insertMany(productsWithSupplier);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
