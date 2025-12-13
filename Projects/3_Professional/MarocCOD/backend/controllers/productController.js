const db = require('../config/database');

// الحصول على جميع المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, c.name_ar as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE
    `;
    const params = [];

    if (category) {
      query += ' AND p.category_id = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (p.name_ar LIKE ? OR p.description_ar LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [products] = await db.query(query, params);

    // الحصول على العدد الإجمالي
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE is_active = TRUE';
    const countParams = [];
    if (category) {
      countQuery += ' AND category_id = ?';
      countParams.push(category);
    }
    if (search) {
      countQuery += ' AND (name_ar LIKE ? OR description_ar LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await db.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// الحصول على منتج واحد
exports.getProduct = async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT p.*, c.name_ar as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    }

    // الحصول على الصور الإضافية
    const [images] = await db.query(
      'SELECT image_url FROM product_images WHERE product_id = ?',
      [req.params.id]
    );

    // الحصول على التقييمات
    const [reviews] = await db.query(
      `SELECT r.*, u.name as user_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = ? 
       ORDER BY r.created_at DESC`,
      [req.params.id]
    );

    const product = {
      ...products[0],
      images: images.map(img => img.image_url),
      reviews
    };

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// إضافة منتج جديد (للمدير فقط)
exports.createProduct = async (req, res) => {
  try {
    const { name_ar, name_en, description_ar, description_en, price, discount_price, category_id, stock, image_main } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (name_ar, name_en, description_ar, description_en, price, discount_price, category_id, stock, image_main) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name_ar, name_en, description_ar, description_en, price, discount_price, category_id, stock, image_main]
    );

    res.status(201).json({
      success: true,
      message: 'تم إضافة المنتج بنجاح',
      productId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// تحديث منتج (للمدير فقط)
exports.updateProduct = async (req, res) => {
  try {
    const { name_ar, price, discount_price, stock, is_active } = req.body;

    await db.query(
      'UPDATE products SET name_ar = ?, price = ?, discount_price = ?, stock = ?, is_active = ? WHERE id = ?',
      [name_ar, price, discount_price, stock, is_active, req.params.id]
    );

    res.json({ success: true, message: 'تم تحديث المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// حذف منتج (للمدير فقط)
exports.deleteProduct = async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};
