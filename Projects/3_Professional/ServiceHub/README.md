# خدماتي - ServiceHub

منصة احترافية كاملة لربط العملاء بمقدمي الخدمات في جميع المجالات

## 🎯 المميزات الكاملة

### ✅ نظام المصادقة والحسابات
- تسجيل دخول وإنشاء حساب كامل
- نوعان من الحسابات: عميل ومحترف
- حماية الصفحات والتحقق من الصلاحيات
- تسجيل خروج آمن

### 👥 لوحة تحكم العميل
- نظرة عامة على الطلبات والإحصائيات
- تصفح المحترفين حسب المهنة
- إرسال طلبات خدمة جديدة
- متابعة حالة الطلبات (قيد الانتظار، مقبول، مكتمل، ملغي)
- إلغاء الطلبات
- تحديث الملف الشخصي

### 👨‍🔧 لوحة تحكم المحترف
- نظرة عامة على الطلبات والإحصائيات
- استقبال طلبات جديدة من العملاء
- قبول أو رفض الطلبات
- تحديث حالة الطلبات إلى مكتمل
- عرض معلومات العملاء (الاسم، الهاتف)
- تحديث الملف الشخصي

### 🌍 دعم متعدد اللغات
- العربية (اللغة الأساسية)
- الإنجليزية
- الفرنسية
- تبديل فوري بين اللغات

### 💾 تخزين البيانات
- **LocalStorage**: يعمل مباشرة في المتصفح بدون خادم
- **SQLite + Node.js**: خيار متقدم مع قاعدة بيانات حقيقية

### 📱 تصميم متجاوب
- يعمل على جميع الأجهزة (كمبيوتر، تابلت، موبايل)
- واجهة مستخدم عصرية وسهلة الاستخدام

## 🚀 طريقة الاستخدام

### الطريقة الأولى: استخدام LocalStorage (بدون خادم)

1. افتح ملف `index.html` في المتصفح مباشرة
2. انقر على "إنشاء حساب" أو "تسجيل الدخول"
3. سجل كعميل أو محترف
4. استمتع بجميع المميزات!

**حسابات تجريبية جاهزة:**
- محترف (سباك): `ahmed@test.com` / `123456`
- محترف (مربية): `fatima@test.com` / `123456`
- عميل: `client@test.com` / `123456`

### الطريقة الثانية: استخدام Node.js + SQLite

1. تثبيت المتطلبات:
```bash
npm install
```

2. تشغيل الخادم:
```bash
npm start
```

3. افتح المتصفح على:
```
http://localhost:3000
```

**مميزات الخادم:**
- قاعدة بيانات SQLite حقيقية
- API RESTful كامل
- بيانات دائمة لا تُحذف
- جاهز للنشر على الإنترنت

## 📁 هيكل الملفات

```
export/
├── index.html                    # الصفحة الرئيسية
├── auth.html                     # صفحة تسجيل الدخول/التسجيل
├── dashboard-client.html         # لوحة تحكم العميل
├── dashboard-professional.html   # لوحة تحكم المحترف
├── styles.css                    # التنسيقات
├── script.js                     # سكريبت الصفحة الرئيسية
├── auth.js                       # سكريبت المصادقة
├── dashboard-client.js           # سكريبت لوحة العميل
├── dashboard-professional.js     # سكريبت لوحة المحترف
├── server.js                     # خادم Node.js (اختياري)
├── package.json                  # إعدادات Node.js
└── README.md                     # هذا الملف
```

## 🎨 الخدمات المتوفرة

- 👶 مربية أطفال
- 🔧 سباك
- ⚡ كهربائي
- 🌳 بستاني
- 🎨 دهان
- 🧹 تنظيف
- 🔨 نجار
- 🚗 ميكانيكي

## 🔄 سير العمل الكامل

### للعميل:
1. تسجيل حساب كعميل
2. تصفح المحترفين حسب المهنة
3. اختيار محترف وإرسال طلب خدمة
4. متابعة حالة الطلب
5. إلغاء الطلب إذا لزم الأمر

### للمحترف:
1. تسجيل حساب كمحترف واختيار المهنة
2. استقبال طلبات من العملاء
3. قبول أو رفض الطلبات
4. الحصول على معلومات العميل (اسم، هاتف)
5. تحديث حالة الطلب إلى مكتمل

## 🔐 الأمان

- كلمات المرور مخزنة (في الإنتاج يجب تشفيرها)
- التحقق من صلاحيات المستخدم
- حماية الصفحات من الوصول غير المصرح
- التحقق من صحة البيانات

## 🌐 API Endpoints (مع الخادم)

```
POST   /api/register              # تسجيل مستخدم جديد
POST   /api/login                 # تسجيل الدخول
GET    /api/professionals         # جلب المحترفين
POST   /api/orders                # إنشاء طلب جديد
GET    /api/orders                # جلب الطلبات
PUT    /api/orders/:id            # تحديث حالة الطلب
PUT    /api/users/:id             # تحديث الملف الشخصي
```

## 📝 ملاحظات مهمة

- البيانات في LocalStorage تُحذف عند مسح بيانات المتصفح
- لبيانات دائمة، استخدم الخادم مع SQLite
- يمكن توسيع المشروع بسهولة لإضافة مميزات جديدة
- الكود نظيف ومنظم وسهل التعديل

## 🚀 التطوير المستقبلي

- [ ] نظام التقييمات والمراجعات
- [ ] نظام الرسائل بين العميل والمحترف
- [ ] نظام الدفع الإلكتروني
- [ ] رفع صور للأعمال السابقة
- [ ] نظام الإشعارات
- [ ] تطبيق موبايل
- [ ] لوحة تحكم الإدارة

## 📞 الدعم

للمساعدة أو الاستفسارات، يمكنك التواصل أو فتح issue في المشروع.

---

# ServiceHub - Complete Platform

Professional platform connecting clients with service providers

## ✅ Complete Features

- Full authentication system (login/register)
- Client dashboard with order management
- Professional dashboard with request handling
- Multi-language support (Arabic, English, French)
- LocalStorage for instant use
- Optional Node.js + SQLite backend
- Responsive design for all devices
- Complete workflow from signup to order completion

## 🚀 Quick Start

### Option 1: LocalStorage (No Server)
Simply open `index.html` in your browser!

### Option 2: Node.js + SQLite
```bash
npm install
npm start
```
Then open http://localhost:3000

## 🔑 Demo Accounts

- Professional (Plumber): `ahmed@test.com` / `123456`
- Professional (Babysitter): `fatima@test.com` / `123456`
- Client: `client@test.com` / `123456`

## 📦 What's Included

- Complete authentication system
- Client dashboard
- Professional dashboard
- Order management system
- Profile management
- Multi-language support
- Responsive design
- LocalStorage + SQLite options

Everything works out of the box!
