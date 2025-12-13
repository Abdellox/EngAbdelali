const db = require('../config/database');

// الحصول على جميع التصنيفات
exports.getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name_ar');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};

// إضافة تصنيف جديد
exports.createCategory = async (req, res) => {
  try {
    const { name_ar, name_en, description, image } = req.body;
    const [result] = await db.query(
      'INSERT INTO categories (name_ar, name_en, description, image) VALUES (?, ?, ?, ?)',
      [name_ar, name_en, description, image]
    );
    res.status(201).json({ success: true, message: 'تم إضافة التصنيف بنجاح', categoryId: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'خطأ في الخادم', error: error.message });
  }
};
