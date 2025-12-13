# دليل البدء السريع ⚡

## ✅ تم تثبيت المشروع بنجاح!

### الخطوات المتبقية:

## 1️⃣ إعداد قاعدة البيانات MySQL

افتح MySQL Command Line أو MySQL Workbench:

```sql
CREATE DATABASE moroccan_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

ثم قم بتنفيذ محتوى ملف: `backend/config/database.sql`

أو استخدم الأمر:
```bash
mysql -u root -p < backend/config/database.sql
```

## 2️⃣ تعديل ملف .env

افتح ملف `.env` وعدّل:
```
DB_PASSWORD=كلمة_مرور_MySQL_الخاصة_بك
```

## 3️⃣ تشغيل المشروع

### الطريقة الأولى: استخدام ملف BAT (Windows)
انقر مرتين على ملف: `START_PROJECT.bat`

### الطريقة الثانية: يدوياً

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 4️⃣ الوصول للمنصة

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 5️⃣ إنشاء حساب مدير

1. سجل حساب عادي من الموقع
2. في MySQL، نفذ:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your_email@example.com';
```

---

## 📊 حالة المشروع الحالية:

✅ Backend Server: يعمل على المنفذ 5000
⏳ Frontend React: قيد التشغيل...

---

## 🎯 الميزات المتاحة:

- ✅ تسجيل الدخول والتسجيل
- ✅ عرض المنتجات والتصنيفات
- ✅ عربة التسوق
- ✅ نظام الطلبات (COD)
- ✅ صفحة الملف الشخصي
- ✅ لوحة تحكم المدير

---

## 🆘 المساعدة:

إذا واجهت أي مشكلة، راجع ملف: `SETUP_INSTRUCTIONS.md`
