# تعليمات الإعداد والتشغيل 🚀

## الخطوة 1: إعداد قاعدة البيانات MySQL

### افتح MySQL Command Line أو MySQL Workbench وقم بتنفيذ:

```sql
CREATE DATABASE IF NOT EXISTS moroccan_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE moroccan_ecommerce;
```

### ثم قم بتنفيذ محتوى ملف `backend/config/database.sql`

أو استخدم الأمر التالي في Command Prompt:
```bash
mysql -u root -p < backend/config/database.sql
```

## الخطوة 2: تعديل إعدادات قاعدة البيانات

افتح ملف `.env` في المجلد الرئيسي وعدّل:
```
DB_USER=root
DB_PASSWORD=كلمة_مرور_MySQL_الخاصة_بك
```

## الخطوة 3: تشغيل Backend

في نافذة Terminal جديدة:
```bash
npm run dev
```

يجب أن ترى: `الخادم يعمل على المنفذ 5000`

## الخطوة 4: تشغيل Frontend

في نافذة Terminal أخرى:
```bash
cd frontend
npm start
```

سيفتح المتصفح تلقائياً على: http://localhost:3000

## الخطوة 5: تسجيل الدخول كمدير

استخدم الحساب الافتراضي:
- البريد: admin@example.com
- كلمة المرور: admin123

**ملاحظة:** يجب تحديث كلمة المرور المشفرة في قاعدة البيانات أولاً

## إنشاء حساب مدير جديد

قم بتسجيل حساب عادي أولاً، ثم في MySQL:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your_email@example.com';
```

## استكشاف الأخطاء

### خطأ في الاتصال بقاعدة البيانات:
- تأكد من تشغيل MySQL
- تحقق من اسم المستخدم وكلمة المرور في ملف `.env`
- تأكد من إنشاء قاعدة البيانات

### خطأ في المنفذ:
- تأكد من عدم استخدام المنفذ 5000 أو 3000 من قبل تطبيق آخر

### خطأ في تثبيت الحزم:
```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
```

---

✅ بعد اتباع هذه الخطوات، المنصة ستكون جاهزة للاستخدام!
