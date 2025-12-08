-- Business Management System Database Schema

-- Users and Authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'manager', 'cashier', 'staff')),
    branch_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Branches/Locations
CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories for products
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products/Items
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 10,
    unit VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory tracking
CREATE TABLE inventory_transactions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    branch_id INTEGER REFERENCES branches(id),
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('in', 'out', 'adjustment', 'waste')),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10, 2),
    reason TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales/Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    branch_id INTEGER REFERENCES branches(id),
    cashier_id INTEGER REFERENCES users(id),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('cash', 'card', 'wallet', 'qr', 'bank_transfer')),
    payment_status VARCHAR(50) DEFAULT 'completed',
    shift_id INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shifts for cash drawer management
CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id),
    user_id INTEGER REFERENCES users(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    opening_cash DECIMAL(10, 2) NOT NULL,
    closing_cash DECIMAL(10, 2),
    expected_cash DECIMAL(10, 2),
    variance DECIMAL(10, 2),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'closed'))
);

-- Expenses
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERENCES branches(id),
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    receipt_url VARCHAR(500),
    user_id INTEGER REFERENCES users(id),
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for security
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_orders_branch ON orders(branch_id);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_cashier ON orders(cashier_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_inventory_product ON inventory_transactions(product_id);
CREATE INDEX idx_shifts_user ON shifts(user_id);
CREATE INDEX idx_expenses_branch ON expenses(branch_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);

-- Insert default data
INSERT INTO branches (name, address, phone) VALUES 
('Main Branch', '123 Main Street', '+1234567890'),
('Branch 2', '456 Second Avenue', '+1234567891');

INSERT INTO categories (name, description) VALUES 
('Food', 'Food items'),
('Beverages', 'Drinks and beverages'),
('Supplies', 'Business supplies');

-- Default admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role, branch_id) VALUES 
('admin@business.com', '$2a$10$XqZ8J5K9X8J5K9X8J5K9XeO', 'System Admin', 'admin', 1);
