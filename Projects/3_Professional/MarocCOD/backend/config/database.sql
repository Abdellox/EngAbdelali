-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS moroccan_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE moroccan_ecommerce;

-- جدول المستخدمين
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول العناوين
CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(50) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  postal_code VARCHAR(10),
  is_default BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- جدول التصنيفات
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_ar VARCHAR(100) NOT NULL,
  name_en VARCHAR(100),
  description TEXT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المنتجات
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_ar VARCHAR(200) NOT NULL,
  name_en VARCHAR(200),
  description_ar TEXT,
  description_en TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  category_id INT,
  stock INT DEFAULT 0,
  image_main VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- جدول صور المنتجات
CREATE TABLE product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- جدول الطلبات
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('cod', 'card', 'paypal') DEFAULT 'cod',
  payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address_id INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id)
);

-- جدول تفاصيل الطلبات
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- جدول التقييمات
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- إدراج بيانات تجريبية
-- مستخدم إداري
INSERT INTO users (name, email, password, role) VALUES 
('المدير', 'admin@example.com', '$2a$10$XQZ9Z9Z9Z9Z9Z9Z9Z9Z9Z.Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z', 'admin');

-- تصنيفات
INSERT INTO categories (name_ar, name_en, description) VALUES 
('الملابس التقليدية', 'Traditional Clothing', 'ملابس مغربية تقليدية أصيلة'),
('الإكسسوارات', 'Accessories', 'إكسسوارات مغربية فاخرة'),
('الديكور المنزلي', 'Home Decor', 'ديكورات منزلية بلمسة مغربية'),
('الحرف اليدوية', 'Handicrafts', 'منتجات حرفية يدوية');
