const db = require('../config/database');

// إنشاء طلب جديد
exports.createOrder = async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { items, shipping_address_id, payment_method = 'cod', notes } = req.body;
    const userId = req.user.id;

    // حساب المجموع الكلي
    let totalAmount = 0;
    for (const item of items) {
      const [products] = await connection.query('SELECT price, discount_price, stock FROM products WHERE id = ?', [item.product_id]);
      
      if (products.length === 0) {
        throw new Error(`المنتج ${item.product_id} غير موجود`);
      }

      const product = products[0];
      if (product.stock < item.quantity) {
        throw new Error(`المخزون غير كافٍ للمنتج ${item.product_id}`);
      }

      const price = product.discount_price || product.price;
      totalAmount += price * item.quantity;
    }

    // إنشاء رقم الطلب
    const orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    // إضافة الطلب
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, order_number, total_amount, payment_method, shipping_address_id, notes) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, orderNumber, totalAmount, payment_method, shipping_address_id, notes]
    );

    const orderId = orderResult.insertId;

    // إضافة تفاصيل الطلب وتحديث المخزون
    for (const item of items) {
      const [products] = await connection.query('SELECT price, discount_price FROM products WHERE id = ?', [item.product_id]);
      const price = products[0].discount_price || products[0].price;

      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, price]
      );

      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الطلب بنجاح',
      order: {
        id: orderId,
        order_number: orderNumber,
        total_amount: totalAmount
      }
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

// الحصول على طلبات المستخدم
exports.getMyOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, a.city, a.address_line1 
       FROM orders o 
       JOIN addresses a ON o.shipping_address_id = a.id 
       WHERE o.user_id = ? 
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// الحصول على تفاصيل طلب
exports.getOrder = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, a.full_name, a.phone, a.city, a.address_line1, a.address_line2 
       FROM orders o 
       JOIN addresses a ON o.shipping_address_id = a.id 
       WHERE o.id = ? AND o.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
    }

    const [items] = await db.query(
      `SELECT oi.*, p.name_ar, p.image_main 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json({
      success: true,
      order: {
        ...orders[0],
        items
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// تحديث حالة الطلب (للمدير فقط)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_status, payment_status } = req.body;

    await db.query(
      'UPDATE orders SET order_status = ?, payment_status = ? WHERE id = ?',
      [order_status, payment_status, req.params.id]
    );

    res.json({ success: true, message: 'تم تحديث حالة الطلب بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// الحصول على جميع الطلبات (للمدير فقط)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email 
      FROM orders o 
      JOIN users u ON o.user_id = u.id
    `;
    const params = [];

    if (status) {
      query += ' WHERE o.order_status = ?';
      params.push(status);
    }

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [orders] = await db.query(query, params);

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};
