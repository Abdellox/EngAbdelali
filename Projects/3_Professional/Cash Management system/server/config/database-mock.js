// Mock database for testing without PostgreSQL
// This stores data in memory - data will be lost when server restarts
const bcrypt = require('bcryptjs');

const mockData = {
  users: [
    {
      id: 1,
      email: 'admin@business.com',
      password_hash: bcrypt.hashSync('admin123', 10),
      full_name: 'System Admin',
      role: 'admin',
      branch_id: 1,
      is_active: true
    },
    {
      id: 2,
      email: 'manager@business.com',
      password_hash: bcrypt.hashSync('manager123', 10),
      full_name: 'Branch Manager',
      role: 'manager',
      branch_id: 1,
      is_active: true
    },
    {
      id: 3,
      email: 'cashier@business.com',
      password_hash: bcrypt.hashSync('cashier123', 10),
      full_name: 'Cashier User',
      role: 'cashier',
      branch_id: 1,
      is_active: true
    }
  ],
  branches: [
    { id: 1, name: 'Main Branch', address: '123 Main Street', phone: '+1234567890', is_active: true },
    { id: 2, name: 'Downtown Branch', address: '456 Downtown Ave', phone: '+1234567891', is_active: true }
  ],
  categories: [
    { id: 1, name: 'Food', description: 'Food items' },
    { id: 2, name: 'Beverages', description: 'Drinks and beverages' },
    { id: 3, name: 'Supplies', description: 'Business supplies' }
  ],
  products: [
    { id: 1, name: 'Coffee', category_id: 2, sku: 'BEV001', price: 3.50, cost: 1.20, stock_quantity: 100, min_stock_level: 20, unit: 'cup', is_active: true },
    { id: 2, name: 'Sandwich', category_id: 1, sku: 'FOOD001', price: 6.99, cost: 3.00, stock_quantity: 50, min_stock_level: 10, unit: 'pcs', is_active: true },
    { id: 3, name: 'Juice', category_id: 2, sku: 'BEV002', price: 4.50, cost: 2.00, stock_quantity: 75, min_stock_level: 15, unit: 'bottle', is_active: true },
    { id: 4, name: 'Burger', category_id: 1, sku: 'FOOD002', price: 8.99, cost: 4.50, stock_quantity: 30, min_stock_level: 10, unit: 'pcs', is_active: true },
    { id: 5, name: 'Salad', category_id: 1, sku: 'FOOD003', price: 7.50, cost: 3.50, stock_quantity: 8, min_stock_level: 10, unit: 'bowl', is_active: true }
  ],
  orders: [],
  order_items: [],
  expenses: [],
  shifts: [],
  inventory_transactions: [],
  audit_logs: []
};

let nextId = {
  users: 4,
  branches: 3,
  categories: 4,
  products: 6,
  orders: 1,
  order_items: 1,
  expenses: 1,
  shifts: 1,
  inventory_transactions: 1,
  audit_logs: 1
};

const mockPool = {
  query: async (text, params) => {
    console.log('Mock Query:', text.substring(0, 100));
    
    // Simple mock responses for common queries
    if (text.includes('SELECT * FROM users WHERE email')) {
      const email = params[0];
      const user = mockData.users.find(u => u.email === email);
      return { rows: user ? [user] : [] };
    }
    
    if (text.includes('SELECT * FROM products')) {
      return { rows: mockData.products };
    }
    
    if (text.includes('SELECT * FROM branches')) {
      return { rows: mockData.branches };
    }
    
    if (text.includes('INSERT INTO products')) {
      const product = {
        id: nextId.products++,
        name: params[0],
        sku: params[2],
        price: params[3],
        cost: params[4],
        stock_quantity: params[5],
        min_stock_level: params[6],
        unit: params[7],
        is_active: true
      };
      mockData.products.push(product);
      return { rows: [product] };
    }
    
    if (text.includes('dashboard')) {
      return {
        rows: [{
          today_sales: 0,
          order_count: 0,
          low_stock_count: 0,
          today_expenses: 0,
          active_shifts: 0
        }]
      };
    }
    
    // Default empty response
    return { rows: [] };
  },
  connect: async () => ({
    query: mockPool.query,
    release: () => {}
  }),
  on: () => {}
};

console.log('⚠️  Using MOCK DATABASE - Data will not persist!');
console.log('📝 Install PostgreSQL for production use');

module.exports = mockPool;
