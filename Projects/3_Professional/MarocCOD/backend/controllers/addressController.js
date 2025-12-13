const db = require('../config/database');

// إضافة عنوان جديد
exports.createAddress = async (req, res) => {
  try {
    const { full_name, phone, city, address_line1, address_line2, postal_code } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      `INSERT INTO addresses (user_id, full_name, phone, city, address_line1, address_line2, postal_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, full_name, phone, city, address_line1, address_line2, postal_code]
    );

    res.status(201).json({
      success: true,
      message: 'تم إضافة العنوان بنجاح',
      addressId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};
